import React, { useEffect, useState, useRef } from 'react';
import authApi from "../api/apiClient.ts";
import AddItem from './AddItemForm.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import {Container, ListGroup, DropdownButton, Dropdown} from "react-bootstrap";
import EditDialog from './EditDialog.tsx';


interface doc {
  id: number
  name: string;
}

type DocListProps = {
  username: string;
};

const DocList =({username}: DocListProps) => {
  const [docs, setDocs] = useState<doc[]>([]);
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const{project, doc} = useParams();
  const [projectId, setProjectId] = useState<number | null>(null);


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

  const addDoc = async (docName: string) => {
    if (!file) return;
    console.log(file.type);
    try {
      const signedUrl = await authApi.post('/docs', { name: docName, project_id: projectId, filename: file!.name}, getAccessTokenSilently);
      try { const response = await fetch(signedUrl.data, {
            method: "PUT",
            headers: {"Content-Type": "application/pdf"},
            body: file
        }) 
        if (!response.ok) {
        const text = await response.text(); 
        console.error("Upload failed", response.status, text);
        } else {console.log("Upload successful!");
        }
        } catch (err) {
        console.error("Fetch error:", err);
        } 
      fetchDocs(); 
      setFile(null);
        if (fileInputRef.current) {
        fileInputRef.current.value = "";
        }
        
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


  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }


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
    <div>
      <h2>Project: {project} Docs List</h2>
      <Container>
  
          <ListGroup>
            {docs.map((doc, index) => (
            <ListGroup.Item 
            key={index}
            className = "d-flex justify-content-between align-items-center"
            >
                <Link to={`/profile/${project}/docs/${doc.id}`}>{doc.name}</Link>
                <DropdownButton title="Settings">
                    <EditDialog oldName={doc.name} oldId={doc.id} onSuccess={editDoc}>Rename</EditDialog>
                    <Dropdown.Item onClick={() => deleteDoc(doc.id)}>Delete</Dropdown.Item>
                </DropdownButton>              
              </ListGroup.Item>
        ))}
          </ListGroup>

      <input type="file" ref={fileInputRef} onChange={handleFile} />
      < AddItem label="Doc" onSuccess={addDoc} />
      </Container>
    </div>
  );
};

export default DocList;