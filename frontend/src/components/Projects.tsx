import React, { useEffect, useState } from 'react';
import authApi from "../api/apiClient.ts";
import AddItem from './AddItem.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";


interface project {
  id: number
  name: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<project[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  const fetchProjects = async () => {
    try {
      const response = await authApi.get('/projects', getAccessTokenSilently);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Projects", error);
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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Projects List</h2>
      <Container>
  
          <ListGroup>
            {projects.map((project, index) => (
          <div key={index}>
            <ListGroup.Item>
                <Link to={`/project/${project.name}`}>{project.name}</Link>              
              </ListGroup.Item>
          </div>
        ))}
          </ListGroup>

      < AddItem label="Project" endpoint="/projects" onSuccess={addProject} />
      </Container>
    </div>
  );
};

export default ProjectList;