import React, { useEffect, useState, useRef } from 'react';
import authApi from "../api/apiClient.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {ListGroup, DropdownButton, Dropdown} from "react-bootstrap";
import EditDialog from './EditDialog.tsx';
import DocDialog from './DocumentDialog.tsx';

interface doc {
  id: number
  name: string;
}

type DocListProps = {
  username: string;
};

const DocList =({username}: DocListProps) => {
  const [docs, setDocs] = useState<doc[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const{project, doc} = useParams();
  const [projectId, setProjectId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false)

  const fetchDocs = async () => {
    try {
      const response = await authApi.get('/docs/' + projectId, getAccessTokenSilently);
      setDocs(response.data);
    } catch (error) {
      console.error("Error fetching Docs", error);
    }
  };

  const deleteDoc = async (docId: number) => {
      try {
        const response = await authApi.delete('/docs/'+docId, getAccessTokenSilently);
        fetchDocs(); 
      } catch (error) {
        console.error("Error deleting Doc", error);
      }
    };

  const addDoc = async (file: File | null, docName: string) => {
    try {
      setLoading(true)
      const signedUrl = await authApi.post('/docs', { name: docName, project_id: projectId, filename: file!.name}, getAccessTokenSilently);
      try { const response = await fetch(signedUrl.data, {
            method: "PUT",
            headers: {"Content-Type": "application/pdf"},
            body: file
        }) 
        if (!response.ok) {
        const text = await response.text(); 
        console.error("Upload failed", response.status, text);
        } else {
        }
        } catch (err) {
        console.error("Fetch error:", err);
        } 
      fetchDocs(); 
      setLoading(false)
  
        
    } catch (error) {
      console.error("Error adding Doc", error);
    }
  };

  const editDoc = async (docId: string | number, newName: string) => {
      try {
        await authApi.put('/docs/'+docId, { name: newName, project_id: projectId, filename: "" }, getAccessTokenSilently);
        fetchDocs(); 
      } catch (error) {
        console.error("Error editing Doc", error);
      }
    };


  async function getProjectId() {
            
    const response = await authApi.get('/projects/'+project, getAccessTokenSilently);
    setProjectId(response.data.project_id);
    };

  useEffect(() => {
    getProjectId();
  }, []);
  useEffect(() => {
  if (projectId !== null) {
    fetchDocs();
  }
}, [projectId]);

  return (
    !docs ? (
    <>
      <h4>Loading documents...</h4>
    </>
  ) : (
    
    <div className="card">
      <h2>{project}: Documents</h2>
  
          <ListGroup style={{width:"80%"}}>
            {docs.map((doc, index) => (
            <ListGroup.Item 
            key={index}
            className = "d-flex justify-content-between align-items-center"
            >
                <Link to={`/profile/${project}/docs/${doc.id}`} style={{fontSize:"1.2rem", fontWeight: "bold"}}>{doc.name}</Link>
                <DropdownButton title="Settings">
                    <EditDialog oldName={doc.name} oldId={doc.id} onSuccess={editDoc}>Rename</EditDialog>
                    <Dropdown.Item onClick={() => deleteDoc(doc.id)}>Delete</Dropdown.Item>
                </DropdownButton>        
              </ListGroup.Item>
        ))}
          </ListGroup>

      <DocDialog loading={loading} onSuccess={addDoc}></DocDialog>
      
    </div>
  )
  );
};

export default DocList;