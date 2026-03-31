import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import AddItem from './AddItemForm.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";
import {ListGroup, DropdownButton, Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import EditDialog from './EditDialog.tsx';

interface project {
  id: number
  name: string;
}

type ProjectListProps = {
  username: string;
};

const ProjectList = ({username}: ProjectListProps) => {
  const [projects, setProjects] = useState<project[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await authApi.get('/projects', getAccessTokenSilently);
      setProjects(response.data);
      return ("Success")
    } catch (error) {
      console.error("Error fetching Projects", error);
    }
  };

  const deleteProject = async (projectId: number) => {
    try {
      await authApi.delete('/projects/'+projectId, getAccessTokenSilently);
      fetchProjects(); 
    } catch (error) {
      console.error("Error deleting Project", error);
    }
  };

  const addProject = async (projectName: string) => {
    try {
      await authApi.post('/projects', { name: projectName }, getAccessTokenSilently);
      fetchProjects(); 
    } catch (error) {
      console.error("Error adding Project", error);
    }
  };

  const editProject = async (projectId: string | number, newName: string) => {
    try {
      await authApi.put('/projects/'+projectId, { name: newName }, getAccessTokenSilently);
      fetchProjects(); 
    } catch (error) {
      console.error("Error editing Project", error);
    }
  };


  useEffect(() => {
    const loadData = async () => {
      await fetchProjects(); 
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
  isLoading ? (
    <>
      <h4>Loading projects...</h4>
    </>
  ) : (
    
  
    
    <div className="card">
      
      <h2>Projects List</h2>
          <ListGroup style={{width:"80%"}}>
            {projects.map((project, index) => (
            <ListGroup.Item 
            key={index}
            className = "d-flex justify-content-between align-items-center"
     
            >
                <Link style={{fontSize: "1.2rem", fontWeight: "bold"}} to={`/profile/${project.name}`}>{project.name}</Link>
                <DropdownButton title="Settings">
                    <EditDialog oldName={project.name} oldId={project.id} onSuccess={editProject}>Rename</EditDialog>
                    <Dropdown.Item onClick={() => deleteProject(project.id)}>Delete</Dropdown.Item>
                </DropdownButton>              
              </ListGroup.Item>
        ))}
          </ListGroup>

      < AddItem label="Project" onSuccess={addProject} />
    </div>
  )
  )
};

export default ProjectList;