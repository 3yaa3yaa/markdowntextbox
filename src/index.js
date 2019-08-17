import React, {Component} from 'react';
import Compiler from '3jsc';

class MarkdownTextBox extends Component{
  constructor(props)
  {
    super(props);
    this.descriptionref=React.createRef();
    if(this.props.ref==null){this.textarearef=React.createRef();}else{this.textarearef=this.props.ref;};
    this.state={markdownvalue: this.getInitialValue(), focus:true};
    if(this.props.compiler==null){this.compiler=new Compiler()}else{this.compiler=this.props.compiler}
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
            width: "100%",
            height: "100%"
          }
  }

  getTextAreaStyle()
  {
    let display="none";
    if(this.state.focus){display="block"};
    return {position:"static",
            display: display,
            width: "100%",
            height: "100%"
            }
  }

  getCalculatedText(text)
  {
      let re = new RegExp(/\$\(([^$()]*)\)/g);
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
