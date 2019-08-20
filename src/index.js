import React, {Component} from 'react';
import Compiler from '3jsc';

class MarkdownTextBox extends Component{
  constructor(props)
  {
    super(props);
    this.descriptionref=React.createRef();
    this.textarearef=React.createRef();
    this.state={markdownvalue: this.getInitialValue(), focus:true};
    if(this.props.compiler==null){this.compiler=new Compiler()}else{this.compiler=this.props.compiler}
  }

  componentDidMount() {
      if(this.props.focus)
      {
          this.setState({state:true})
      }
      else
      {
          this.setState({state:false})
      }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if(this.state)
      {
          this.textarearef.focus();
      }
      else
      {
          this.textarearef.blur();
      }
  }

    getInitialValue()
  {
      let propvalue=this.props.value;
      if(propvalue!=null)
      {
          return propvalue;
      }
      else
      {
          return "";
      }
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
      if(this.props.style==null)
      {
          return {position:"static",
              width:"100%",
              height:"100%"};
      }else
      {
          return this.props.style;
      }

  }

  getDescriptionStyle()
  {
    let display="block";
    if(this.state.focus){display="none"};
    return {position:"static",
            display: display,
            wordWrap:"break-word",
            width: "100%",
            height: "100%",
            minHeight:"20px"
          }
  }

  getTextAreaStyle()
  {
    let display="none";
    if(this.state.focus){display="block"};
    let height=this.textarearef.offsetHeight;
    if(this.textarearef.scrollHeight>height){height=this.textarearef.scrollHeight};
    return {position:"static",
            display: display,
            backgroundColor:"transparent",
            width: "100%",
            height: height,
            resize:"none",
            minHeight:"20px",
            boxSizing:"border-box"
            }
  }

  getCalculatedText(text)
  {
      let re = new RegExp(/\=([^ ]+)( |$)/g);
      return text.replace(re,(match, capture)=>{return this.compiler.calc(capture)})
  }

  safeExec(callback,e)
  {
      if(typeof(callback)=='function')
      {
          callback(e)
      }
  }

  render()
  {
    return (
        <div style={this.getTopLevelStyle()}>
          <div style={this.getDescriptionStyle()}
               onClick={e=>this.onFocusHandler(e)}
               ref={e=>{this.descriptionref=e}}>{this.getCalculatedText(this.state.markdownvalue)} </div>
          <textarea style={this.getTextAreaStyle()}
                    onKeyDown={e=>{this.safeExec(this.props.onKeyDown,e)}}
                    onChange={e=>{this.onChangeHandler(e);this.safeExec(this.props.onChange,e)}}
                    onBlur={e=>{this.onBlurHandler(e)}}
                    onFocus={e=>{this.onFocusHandler(e)}}
                    value={this.state.markdownvalue}
                    ref={e=>{this.textarearef=e}}></textarea>
        </div>
    );
  }

}

export default MarkdownTextBox;
