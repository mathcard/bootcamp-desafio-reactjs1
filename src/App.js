import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio BootCamp RockerSeat React',
      url: 'https://github.com/mathcard/bootcamp-desafio-reactjs1',
      techs: ['reacjs', 'nodejs'],
    });

    const repositorie = response.data;
    setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
    console.log(id);

    await api.delete(`repositories/${id}`);
    const newRepositories = (repositories.filter(repository => repository.id !== id));
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => 
          <li key={repositorie.id}>{repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
