import React from "react";
//import Compiler from "@3yaa3yaa/3jsc";

 class Reserved
{
    constructor(keyword, stopword, behaviour, description)
    {
        this.keyword　=　keyword;
        this.stopword　=　stopword;
        this.behaviour　=　behaviour;
        this.description = description;
    }

}

export default class ReservedList
{
    constructor(customReservedItems, language)
    {
        let arr=[];
        //this.compiler=new Compiler();
        //this.items.push(new Reserved('=', (node)=>{return this.getJSX(this.compiler.calc(node))},false, " "))
        arr.push(new Reserved('#'," ", (node)=>{return this.getTagJSX(node)},"label(:value)"))
        arr.push(new Reserved('*',"*", (node)=>{return this.getBoldJSX(node)},"bold"))
        arr.push(new Reserved('`',"`", (node)=>{return this.getCodeJSX(node)},"code"))
        arr.push(new Reserved('h1.',"\n", (node)=>{return this.getHeaderJSX(node,1)},"header"))
        arr.push(new Reserved('h2.',"\n", (node)=>{return this.getHeaderJSX(node,2)},"header"))
        arr.push(new Reserved('h3.',"\n", (node)=>{return this.getHeaderJSX(node,3)},"header"))
        arr.push(new Reserved('h4.',"\n", (node)=>{return this.getHeaderJSX(node,4)},"header"))
        arr.push(new Reserved('h5.',"\n", (node)=>{return this.getHeaderJSX(node,5)},"header"))
        arr.push(new Reserved('h6.',"\n", (node)=>{return this.getHeaderJSX(node,6)},"header"))
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



    getJSX(text)
    {
        return <div style={{display:"inline"}}>{text}</div>;
    }

    getCodeJSX(text)
    {
        return <div style={{display:"block",
                            fontSize:"80%",
                            fontFamilly:"monospace",
                            backgroundColor:"#EEEEEE"
                            }}>{this.getCodeLines(text)}</div>;
    }

    getCodeLines(text)
    {
        let arr=text.split("\n");
        let out="";
        let linenum=0;
        for(let line of arr)
        {
            if(line.length>0)
            {
                linenum=linenum+1;
                out= out+ ('0000000'+linenum).slice((Math.floor(arr.length/10)+1)*(-1)) + "> " + line + "\n"
            }
        }
        return out;

    }

    getBoldJSX(text)
    {
        return <div style={{display:"inline",fontWeight:"bold"}}>{text}</div>;
    }


    getDivStyle()
    {
        return {
            display:"inline"
        }
    }

    getHeaderJSX(text, level)
    {
        switch (level) {
            case 1:
                return <h1 style={{margin:"0px"}}>{text}</h1>;
            case 2:
                return <h2 style={{margin:"0px"}}>{text}</h2>;
            case 3:
                return <h3 style={{margin:"0px"}}>{text}</h3>;
            case 4:
                return <h4 style={{margin:"0px"}}>{text}</h4>;
            case 5:
                return <h5 style={{margin:"0px"}}>{text}</h5>;
            case 6:
                return <h6 style={{margin:"0px"}}>{text}</h6>;
            default:
                return <h1 style={{margin:"0px"}}>{text}</h1>;
        }
    }


    getTagJSX(text)
    {
        return <div style={this.getTagStyle()}>{text}</div>;
    }

    getTagStyle()
    {
        return {
            display:"inline",
            textAlign: "justify",
            verticalAlign:"middle",
            backgroundColor: "#FFDDFF",
            fontsize:"8px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderBottomLeftRadius:"20px",
            borderTopLeftRadius:"20px",
            borderBottomRightRadius:"20px",
            borderTopRightRadius:"20px",
            width: "50px",
            height: "10px",
            color: "#FF00FF"
        }
    }


}


