import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
  interface State {
    Screws: Screw[];
  }
  
  interface Screw {
    id: number
    típus: string;
    hossz: number;
    készlet: number;
    ár: number
  }
  
  interface ScrewListResponse {
    Screws: Screw[];
  }
    class App extends Component<{}, State> {

      constructor(props: {}) {
        super(props);
    
        this.state = {
          Screws: [],
        }
      }
    
    
      async loadScrews() {
        let response = await fetch('http://localhost:3000/csavar');
        let data = await response.json() as ScrewListResponse;
        this.setState({
          Screws: data.Screws,
        })
      }
    
      componentDidMount() {
        this.loadScrews();
      }
    
      async handleDelete(id: number) {
            let response = await fetch('http://localhost:3000/csavar/' + id, {
              method: 'DELETE'
            });
            await this.loadScrews();
    
      };
    
      render() {
          return <div className="container-fluid App text-white bg-dark">
                  <h2>Csavar Webáruház</h2>          
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Típus</th>
                        <th>Hossz</th>
                        <th>Készlet</th>
                        <th>Ár</th>
                        <th>Törlés</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.Screws.map(Screws => <tr>
                                                      <td>{Screws.típus}</td>
                                                      <td>{Screws.hossz}</td>
                                                      <td>{Screws.készlet}</td>
                                                      <td>{Screws.ár}</td>
                                                      <td width={1}>
                                                        <button className='btn btn-danger btn-sm' onClick={() => this.handleDelete(Screws.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                                      </td>
                                                    </tr>)}  
                      
                    </tbody>
                  </table>
                </div>
                
          
        ;
      }
    }
  
    export default App;
