//import Compiler from '@3yaa3yaa/3jsc';
import React, {Component} from 'react';
import TextIterator from "./TextIterator";
import ReservedList from "./Reserved";

class MarkdownTextBox extends Component{
  constructor(props)
  {
    super(props);
    this.descriptionref=React.createRef();
    this.textarearef=React.createRef();
    this.reservedList=new ReservedList(this.props.reservedItems);
    //this.state={markdownvalue: this.getInitialValue(), focus:false};
    this.state={markdownvalue: this.getInitialValue(), width: "", height:""};
    //if(this.props.compiler==null){this.compiler=new Compiler()}else{this.compiler=this.props.compiler}
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      //if(this.state)
      if(this.props.focus)
      {
          // let height=this.textarearef.offsetHeight;
          // if(this.textarearef.scrollHeight>height){height=(parseInt(this.textarearef.scrollHeight) + 30) + "px" };
          // let width="300px";
          // this.setState({width: width, height: height });
          this.textarearef.focus();
      }
      else
      {
          //this.setState({width: "100%", height: "100%" });
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

  getTopLevelStyle()
  {
      if(this.props.style==null)
      {
          return {position:"static",
          //    width:this.state.width,
          //    height:this.state.height
          };
      }else
      {
          return this.props.style;
      }

  }

  getDescriptionStyle()
  {
    let display="block";
    if(this.props.focus){display="none"};
    let color="black";
    if(this.props.descriptionColor!=undefined){color=this.props.descriptionColor};
    return {position:"static",
            display: display,
            color: color,
            whiteSpace:"pre-wrap",
            wordWrap:"break-word",
            minWidth: "100px",
            maxWidth: "200px",
            //height: this.state.height,
            minHeight:"20px"
          }
  }

  getEditorStyle()
  {
      let display="none";
      if(this.props.focus){display="block"};
      return {
          display: display,
      }

  }

  getTextAreaStyle()
  {
      // let display="none";
      // if(this.props.focus){display="block"};
      let color="black";
      if(this.props.textBoxColor!=undefined){color=this.props.textBoxColor};

      //if(this.props.width!=undefined){width=this.props.width}else{width="300px"};
    return {position:"static",
            //display: display,
            color: color,
            outline:"none",
            border: "0px",
            backgroundColor:"transparent",
            width: "200px",
            height: "175px",
            resize:"none",
            minHeight:"30px",
            minWidth: "100px",
            margin:"1px",
            padding:"1px",
            boxSizing:"border-box"
            }
  }

  getDescriptionText(text)
  {
      let ti=new TextIterator(text, this.reservedList);
      return ti.getALLJSX();
  }

  safeExec(callback,e)
  {
      if(typeof(callback)=='function')
      {
          callback(e)
      }
  }

  getDescription()
  {
          return <div className="description" style={this.getDescriptionStyle()}
                      ref={e=>{this.descriptionref=e}}>{
                          this.getDescriptionText(this.state.markdownvalue)
                      }</div>

  }
  getTextArea()
  {

          return <div style={this.getEditorStyle()}>
                      <textarea className="text"
                                       style={this.getTextAreaStyle()}
                                       onKeyDown={e=>{this.safeExec(this.props.onKeyDown,e)}}
                                       onChange={e=>{this.onChangeHandler(e);this.safeExec(this.props.onChange,e)}}
                                       value={this.state.markdownvalue}
                                       ref={e=>{this.textarearef=e}}></textarea>
                      <div style={{fontSize:"75%",color:"#666666", whiteSpace:"pre-wrap", width:"200px"}}>&#x1F9D0; Tips
                          <br />{this.reservedList.items.map((item)=>{return (item.keyword+ item.description + item.stopword + " ").replace("\n"," ")})}
                      </div>
                  </div>
  }

  render()
  {
    return (
        <div className="top" style={this.getTopLevelStyle()}>
            {this.getDescription()}
            {this.getTextArea()}
        </div>
    );
  }

}

export default MarkdownTextBox;
