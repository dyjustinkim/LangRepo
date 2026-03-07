import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import AddItem from './AddItem.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";
import {Container, ListGroup, DropdownButton, Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditDialog from './EditDialog.tsx';

interface project {
  id: number
  name: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<project[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const { username } = useParams();

  const fetchProjects = async () => {
    try {
      const response = await authApi.get('/projects', getAccessTokenSilently);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Projects", error);
    }
  };

  const deleteProject = async (projectName: string) => {
    try {
      const response = await authApi.delete('/projects/'+projectName, getAccessTokenSilently);
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

  const editProject = async (projectName: string, newName: string) => {
    try {
      await authApi.put('/projects/'+projectName, { name: newName }, getAccessTokenSilently);
      fetchProjects(); 
    } catch (error) {
      console.error("Error editing Project", error);
    }
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects List</h2>
      <Container>
  
          <ListGroup>
            {projects.map((project, index) => (
            <ListGroup.Item 
            key={index}
            className = "d-flex justify-content-between align-items-center"
            >
                <Link to={`/${username}/${project.name}`}>{project.name}</Link>
                <DropdownButton title="Settings">
                    <EditDialog oldName={project.name} onSuccess={editProject}>Edit</EditDialog>
                    <Dropdown.Item onClick={() => deleteProject(project.name)}>Delete</Dropdown.Item>
                </DropdownButton>              
              </ListGroup.Item>
        ))}
          </ListGroup>

      < AddItem label="Project" endpoint="/projects" onSuccess={addProject} />
      </Container>
    </div>
  );
};

export default ProjectList;