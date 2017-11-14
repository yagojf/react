import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//lista de tarefas simples com container e as funções dentro dele
// tudo será renderizado em um unico componente 

class ListaContainer extends React.Component {

    constructor() {

        super();
        this.state = {

            tarefas: [],
            inputTarefa: ""
        };

        // funçaõ add nova tarefa
        this.addTarefa = (ev) => {
            ev.preventDefault();
            const tarefas = this.state.tarefas.slice();
            tarefas.push(this.state.inputTarefa);
            this.setState({
                tarefas: tarefas,
                inputTarefa: ""

            });
        };
        //edita as taredas
        this.editTareda = (index, valor) => {
            const tarefas = this.state.tarefas.slice();
            tarefas[index] = valor;
            this.setState({ tarefas });

        }
        this.removeTarefa = (index) => {
            const tarefas = this.state.tarefas.slice();
            // função splice detecta e remove um item do array
            tarefas.splice(index, 1);
            this.setState({ tarefas });
        };

        this.onChange = (ev) => {
            ev.preventDefault();
            const state = Object.assign({}, this.state);
            state[ev.target.name] = ev.target.value;
            this.setState(state);
        };
    }

    render() {

        return (
            //gerencia as tarefas
            <ListaView
                tarefas={this.state.tarefas}
                inputTarefa={this.state.inputTarefa}
                onChange={this.onChange}
                addTarefa={this.addTarefa}
                removeTarefa={this.removeTarefa}
                editTareda={this.editTareda}
            />
        );
    }
}
const ListaView = (props) => (
    <div>
        <h1>Lista de Tarefas </h1>
        <input name="inputTarefa" value={props.inputTarefa} onChange={props.onChange} />
        <button onClick={props.addTarefa}> Add </button>
        {

            props.tarefas.map((tarefa, index) =>
                (
                    <ListaViewItem
                        tarefa={tarefa}
                        index={index}
                        removeTarefa={props.removeTarefa}
                        editTareda={props.editTareda}
                    />
                ))
        }
    </div>
);

class ListaViewItem extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            edit: false,
            texto: props.tarefa
            //nao precisa chamar o this pois o prosps já ta sendo chamado acima
        }

        //confirmar que o usuario quer remover a tarefa
    
        this.removeTarefa = () => {
        //    if(confirm("voce realmente quer apagar essa informação??")){
            this.props.removeTarefa(this.props.index);
        //}
    }

        this.editTareda = () => {
            this.props.editTareda(this.props.index,
                this.state.texto);
            this.setState({ edit: false });
        }
        this.abrirForm = () => {
            this.setState({ edit: true });
        }
        this.fecharForm = () => {

            this.setState({ edit: false });
        }

        this.onChange = (ev) => {

            this.setState({ texto: ev.target.value });
        }
    }
    render() {

        if (!this.state.edit) {
            return (
                <p>
                    {this.props.index + 1} - {this.props.tarefa} -
                    <span style={{ cursor: "pointer" }} onClick={this.abrirForm}>- Clique aqui para Alterar</span>
                    <span style={{ cursor: "pointer" }} onClick={this.removeTarefa}>- Clique aqui para excluir</span>
                </p>
            );
        }
        return (
            <div>
                {this.props.index + 1} <input value={this.state.texto} onChange={this.onChange} />
                <span style={{ cursor: "pointer" }} onClick={this.editTareda}> Salvar</span>
                <span style={{ cursor: "pointer" }} onClick={this.fecharForm}> Cancelar</span>
            </div>
        );
    }

}
ReactDOM.render(<ListaContainer />, document.getElementById('root'));
