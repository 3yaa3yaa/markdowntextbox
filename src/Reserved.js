import React from "react";
//import Compiler from "@3yaa3yaa/3jsc";

export class Reserved
{
    constructor(keyword, stopwords, behaviour, description)
    {
        this.keyword　=　keyword;
        this.stopwords　=　stopwords;
        this.behaviour　=　behaviour;
        this.description = description;
    }
}

export class ReservedList
{
    constructor(customReservedItems, language)
    {
        let arr=[];
        //this.compiler=new Compiler();
        //this.items.push(new Reserved('=', (node)=>{return this.getJSX(this.compiler.calc(node))},false, " "))
        arr.push(new Reserved('*',["*"], (node,index)=>{return this.getBoldJSX(node,index)},"bold"))
        arr.push(new Reserved('```',["```"], (node,index)=>{return this.getCodeJSX(node,index)},"code"))
        arr.push(new Reserved('h1.',["\n","\r\n","\r"], (node,index)=>{return this.getHeaderJSX(node,1,index)},"header"))
        arr.push(new Reserved('h2.',["\n","\r\n","\r"], (node,index)=>{return this.getHeaderJSX(node,2,index)},"header"))
        arr.push(new Reserved('h3.',["\n","\r\n","\r"], (node,index)=>{return this.getHeaderJSX(node,3,index)},"header"))
        arr.push(new Reserved('h4.',["\n","\r\n","\r"], (node,index)=>{return this.getHeaderJSX(node,4,index)},"header"))
        arr.push(new Reserved('h5.',["\n","\r\n","\r"], (node,index)=>{return this.getHeaderJSX(node,5,index)},"header"))
        arr.push(new Reserved('h6.',["\n","\r\n","\r"], (node,index)=>{return this.getHeaderJSX(node,6,index)},"header"))
        if(Array.isArray(customReservedItems))
        {
            arr=arr.concat(customReservedItems);
        }
        this.items=arr;
    }

    getKeywords()
    {
       return this.items.map((item)=>{return item.keyword});
    }

    GetReservedDefinition(text)
    {
        let reserved=this.items.find((reserved)=>{return (reserved.keyword===text)})
        if(reserved===undefined)
        {
            return null;
        }
        else
        {
            return reserved;
        }
    }



    getJSX(text,index)
    {
        return <div  key={index} style={{display:"inline"}}>{text}</div>;
    }

    getCodeJSX(text,index)
    {
        return <div key={index}>{this.getCodeLines(text)}</div>;
    }

    getCodeLines(text)
    {
        let arr=text.split("\n");
        arr=arr.filter((val,index)=>!((val==="") && (index===0 || index===arr.length-1)));
        let boxheight = 18 * arr.length + 20;
        let body = arr.map((line,index)=>{return <div key={"bodyline-"+ index} style={this.getCodeLineStyle()}>{line}</div>});
        let linenums =  arr.map((line, index)=>{return <div key={"linenumber-"+ index} style={this.getLineNumberStyle()}>{index+1}</div>});

        let out=<div style={{width:"100%", minWidth:"200px", marginTop:'10px', height:boxheight+"px", position:"relative"}}>
            <div style={{position:"absolute", left:"0px",width:"30px", minWidth:"30px", textAlign:"center",backgroundColor:"#888888"}}>{linenums}</div>
            <div style={{position:"absolute",left:"30px",right:"10px", paddingLeft:"10px", overflowX:"auto",backgroundColor:"#999999"}}>{body}</div>
        </div>
        return out;
    }

    getBaseCodeLineStyle()
    {
        return {display:"block",
            height:"18px",
            fontFamily:"Consolas, \"Courier New\", monospace",
            width:"90%",
            color:"#FFFFEE",
            backgroundColor:"inherit",
            fontSize:"80%",
            margin:"0px",
            whiteSpace:"pre"}
    }

    getCodeLineStyle()
    {
        let out=this.getBaseCodeLineStyle();
        out.paddingRight="10px";
        return out;
    }


    getLineNumberStyle()
    {
        let out=this.getCodeLineStyle();
        out.userSelect="none";
        out.WebkitUserSelect="none";
        return out;
    }



    getBoldJSX(text,index)
    {
        return <div  key={index} style={{display:"inline",fontWeight:"bold"}}>{text}</div>;
    }


    getDivStyle()
    {
        return {
            display:"inline"
        }
    }

    getHeaderJSX(text, level,index)
    {
        switch (level) {
            case 1:
                return <h1 key={index} style={{margin:"0px"}}>{text}</h1>;
            case 2:
                return <h2 key={index} style={{margin:"0px"}}>{text}</h2>;
            case 3:
                return <h3 key={index} style={{margin:"0px"}}>{text}</h3>;
            case 4:
                return <h4 key={index} style={{margin:"0px"}}>{text}</h4>;
            case 5:
                return <h5 key={index} style={{margin:"0px"}}>{text}</h5>;
            case 6:
                return <h6 key={index} style={{margin:"0px"}}>{text}</h6>;
            default:
                return <h1 key={index} style={{margin:"0px"}}>{text}</h1>;
        }
    }



}


