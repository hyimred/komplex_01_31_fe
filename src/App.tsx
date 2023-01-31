import React, { Component } from 'react';
import './App.css';
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
            let response = await fetch('http://localhost:3000/api/tarhely/' + id, {
              method: 'DELETE'
            });
            await this.loadScrews();
    
      };
    
      render() {
        return <div className='container'>
          <h2>Tárhelyek</h2>
          <div className="row d-flex flex-row m-2">
          {this.state.Screws.map(Screws => <div className="col-md-4 col-sm-12 bg-primary p-2 text-center border border-dark">
                                                  <h4 className="text-white">{Screws.típus}</h4>
                                                  <p className="text-white">{Screws.hossz}</p>
                                                  <p className="text-white">{Screws.készlet}</p>
                                                  <p className="text-white">{Screws.ár}</p>
                                                  <button className='btn btn-danger btn-sm' onClick={() => this.handleDelete(Screws.id)}>Törlés</button>
                                              </div>)}  
          </div>
    
          <h2>Új Tárhely</h2>
    
          <form>
    
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Tárhely neve:</span>
              </div>
              <input type="text" className="form-control" ></input>
            </div>
    
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Tárhely mérete:</span>
              </div>
              <input type="text" className="form-control" ></input>
            </div>
    
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Tárhely ára:</span>
              </div>
              <input type="text" className="form-control" ></input>
            </div>
    
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Tárhely tipusa:</span>
              </div>
              <input type="text" className="form-control" ></input>
            </div>
            
            <button className='btn btn-outline-primary' >Új Tárhely</button>
    
          </form>
          
        </div >;
      }
    }
  
    export default App;
