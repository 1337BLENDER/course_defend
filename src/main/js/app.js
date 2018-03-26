const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

const follow = require('./follow');

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Form />
            </div>
        )
    }

}


const Input= (props)=>(
    <div>
        <div className="input-label-wrapper">
            <label htmlFor={props.id} className="label"><mm>{props.label}</mm></label>
        </div>
        <div className="input-wrapper">
            <input id={props.id} name={props.id} ref={props.ref} type={props.inputType} placeholder={props.placeholder} className={props.inputType} onInput={props.onInput} value={props.value}/>
        </div>
    </div>
);

class Form extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.submit=this.submit.bind(this);
        this.state={ errorY: ''};
    }
    submit(submitEvent) {
        if(this.state.errorY.length===0) {
            var y = document.getElementById("y").value;
            if(y.length>0) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", '/toBack?data=' + y, true);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    }
                };

                xhr.send();
                submitEvent.preventDefault();
            }
        }
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value});
        if(event.target.name==="y") {
            let val = event.target.value;
            this.state.errorY='';
            if(isNaN(val)){
                this.state.errorY+="Y должно быть числом";
            }else {
                if(val<-5||val>5){
                    this.state.errorY+='Y должно быть между 5 и -5';
                }else {
                    this.state.errorY+='';
                }
            }
        }
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    <Input id="y" label="Y:" onInput={this.handleChange} inputType="text" placeholder="введите Y"/>
                    <ErrorLabel label={this.state.errorY}/>
                    <button type="submit" onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}

class ErrorLabel extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <label className="error">{this.props.label}</label>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('react'));