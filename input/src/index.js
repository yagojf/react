import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Input extends React.Component {

    constructor() {

        super();
        this.state = {

            nome: "",
            sexo: "",
            escola: ""
        };
        this.onChange = (evento) => {
            //console.log(evento.target.name);
            const state = Object.assign({}, this.state);
            //console.log(state);
            const campo = evento.target.name;
            state[campo] = evento.target.value;
            /*  if (campo=== 'nome'&& evento.target.value.includes('_')){
         
                 return;
             } */
            this.setState(state);
            //this.setState({nome: evento.target.value});
        };
        this.onSubmit = (evento) => {
            evento.preventDefault();
            // validaçao
            console.log(this.state);
        };
    }
    render() {
        return (
            <div>
                <center><h1>Digite os dados no form</h1></center><br />
                Nome : <input name="nome"
                    value={this.state.nome}
                    onChange={this.onChange}
                    type="text" /><br />

                Sexo: masculino< input type="radio" name="sexo" value="masculino" onChange={this.onChange} checked={this.state.sexo === "masculino"} />
                feminino< input type="radio" name="sexo" value="feminino" onChange={this.onChange} checked={this.state.sexo === "feminino"} /><br />
                Escola: <select onChange={this.onChange} name="escola" value={this.state.escola}>
                    <option value="1">Selecione </option>
                    <option value="2">Ja sou Formado </option>
                    <option value="3">Ainda estudando</option>
                </select><br />
                <br />

                <button onClick={this.onSubmit}> enviar </button>
                <br />
                <br />
                
                //transforma o objeto array em string e usando para validar 
                <br />
                <br />
                {JSON.stringify(this.state)}
            </div>
        );
    }
}


ReactDOM.render(<Input />, document.getElementById('root'));

