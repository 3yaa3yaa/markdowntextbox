import React, {Component} from 'react';
import logo from './logo.svg';
import './MarkdownTextBox.css';

class MarkdownTextBox extends Component{
  constructor(props)
  {
    super(props);
    this.descriptionref=React.createRef();
    this.textarearef=React.createRef();
    this.state={markdownvalue:"", focus:true}
  }

  onChangeHandler(e)
  {
    this.setState({markdownvalue:e.target.value})
  }

  onBlurHandler(e)
  {
    this.setState({focus:false})
  }
  onFocusHandler(e)
  {
    this.setState({focus:true})
  }


  getTopLevelStyle()
  {
    return {position:"relative",
            width:"200px",
            height:"50px"}
  }

  getDescriptionStyle()
  {
    let display="block";
    if(this.state.focus){display="none"};
    return {position:"relative",
            display: display,
            width: "100%",
            height: "100%"
          }
  }

  getTextAreaStyle()
  {
    let display="none";
    if(this.state.focus){display="block"};
    return {position:"relative",
            display: display,
            width: "100%",
            height: "100%"
            }
  }

  render()
  {
    return (
        <div style={this.getTopLevelStyle()}>
          <div style={this.getDescriptionStyle()}
               onClick={e=>this.onFocusHandler(e)}
               ref={e=>{this.descriptionref=e}}>{this.state.markdownvalue} </div>
          <textarea style={this.getTextAreaStyle()}
                    onChange={e=>{this.onChangeHandler(e)}}
                    onBlur={e=>{this.onBlurHandler(e)}}
                    onFocus={e=>{this.onFocusHandler(e)}}
                    ref={e=>{this.textarearef=e}}></textarea>
        </div>
    );
  }

}

export default MarkdownTextBox;
