import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
  interface State {
    Screws: Screw[];
    regTipus: string;
    regKeszlet: string;
    regHossz: string;
    regAr: string
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
          regTipus: '',
          regKeszlet: '',
          regHossz: '',
          regAr: '',
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

      handleNew = async () => {

        const { regTipus, regKeszlet, regAr, regHossz } = this.state;
        if (regTipus.trim() === '') {
          // this.setState() -tel hibaüzenet megjelenítése
          return;
        }
    
        const adat = {
          típus: regTipus,
          készlet: regKeszlet,
          ár: regAr,
          hossz: regHossz
        };
    
        let response = await fetch('http://localhost:3000/csavar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(adat),
        });
    
        this.setState({
          regTipus: '',
          regKeszlet: '',
          regAr: '',
          regHossz: '',
        })
    
        await this.loadScrews();
        window.location.reload();
    
      }
    
      async handleDelete(id: number) {
            let response = await fetch('http://localhost:3000/csavar/' + id, {
              method: 'DELETE'
            });
            await this.loadScrews();
            window.location.reload();
    
      };
    
      render() {
        const { regTipus, regKeszlet, regAr, regHossz } = this.state;
          return <div className="container-fluid App text-white bg-dark">
                  <h2>Csavar Webáruház</h2>
                  <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">
                    Új felvétele
                  </button>     
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
                                                      <td>{Screws.hossz}mm</td>
                                                      <td>{Screws.készlet}db</td>
                                                      <td>{Screws.ár}$</td>
                                                      <td width={1}>
                                                        <button className='btn btn-danger btn-sm' onClick={() => this.handleDelete(Screws.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                                      </td>
                                                    </tr>)}  
                      
                    </tbody>
                  </table>

                  <div className="modal" id="myModal">
                    <div className="modal-dialog">
                      <div className="modal-content bg-dark">

                        <div className="modal-header">
                          <h4 className="modal-title">Új felvétele</h4>
                          <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                        <form>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Csavar Típusa:</span>
                            </div>
                            <input type="text" className="form-control" value={regTipus} onChange={e => this.setState({ regTipus: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Csavar Készlet (db):</span>
                            </div>
                            <input type="number" className="form-control" value={regKeszlet} onChange={e => this.setState({ regKeszlet: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Csavar Hossza (mm):</span>
                            </div>
                            <input type="number" className="form-control" value={regHossz} onChange={e => this.setState({ regHossz: e.currentTarget.value })}></input>
                          </div>

                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text">Csavar Ára ($):</span>
                            </div>
                            <input type="number" className="form-control" value={regAr} onChange={e => this.setState({ regAr: e.currentTarget.value })}></input>
                          </div>

                          <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={this.handleNew}>Új</button>

                          </form>
                          
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              
        ;
      }
    }
    
  
    export default App;
