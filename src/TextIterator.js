import React, {Component} from 'react';
import ReservedList from "./Reserved";

class Item{
    constructor(mode,value){
        this.mode=mode;
        this.value=value;
    }

    getJSX()
    {
        if(this.mode===null)
        {
            return  <div style={{display:"inline"}}>{this.value}</div>;
        }
        else
        {
            return this.mode.behaviour(this.value);
        }
    }
}

export default class TextIterator{
    constructor(rawtext, reservedList)
    {
        this.items=[];
        this.rawtext=rawtext;
        this.index=0;
        this.reservedList=reservedList;
        this.tokenize();
    }

    Next()
    {
        if(this.index<this.items.length-1)
        {
            this.index=this.index+1;
            return true;
        }
        else
        {
            return false;
        }
    }

    getALLJSX()
    {
        return this.items.map((item)=>{return item.getJSX()})
    }

    getCurrent()
    {
        return this.items[this.index];
    }

    getItemValues()
    {
        return this.items.map((item)=>{return item.value});
    }
    tokenize()
    {
        let index=0;
        let mode=null;
        let text="";

        while(index < this.rawtext.length)
        {
            if(mode===null)
            {
                mode = this.startsFromReserved(this.rawtext.slice(index)) ;
                if(mode===null){
                    if(this.items.length===0){this.items.push(new Item(null, ""))};
                    this.items[this.items.length-1].value = this.items[this.items.length-1].value + this.rawtext.slice(index, index+1);
                    index=index+1;
                }
                else
                {
                    index=index+mode.keyword.length;
                    this.items.push(new Item(mode, ""));
                }
            }
            else
            {
                let stopword=this.startsFromStopWord(this.rawtext.slice(index),mode);
                if(stopword!="")
                {
                    index=index+stopword.length;
                    mode=null;
                    this.items.push(new Item(null, ""))
                }
                else
                {
                    this.items[this.items.length-1].value = this.items[this.items.length-1].value + this.rawtext.slice(index, index+1);
                    index=index+1;
                }
            }
        }
    }

    startsFromStopWord(text,mode)
    {
        let regexp = new RegExp('^'+ mode.stopword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
        if (text.match(regexp)!=undefined)
        {
            return mode.stopword;
        }
        else
        {
            return "";
        }
    }

    startsFromReserved(text)
    {
        let hasStart = (keyword, text) => {
            let regexp = new RegExp('^'+ keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
            if (text.match(regexp)!=undefined)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        for (let reserved of this.reservedList.items)
        {
            if (hasStart(reserved.keyword, text))
            {
                return reserved;
            }
        }
        return null;
    }




}