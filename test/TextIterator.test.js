import React from 'react';
import TextIterator from "../src/TextIterator";
import { Reserved, ReservedList } from "../src/Reserved";

describe('A suite', function() {
    it('should tokenize properly', function(){
        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("aaa", rl)
        expect(ti.getItemValues()).toStrictEqual(["aaa"]);
        expect(ti.items[0].mode).toBeNull();
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("aaa#bbb", rl)
        expect(ti.getItemValues()).toStrictEqual(["aaa","bbb"]);
        expect(ti.items[0].mode).toBeNull();
        expect(ti.items[1].mode.keyword).toStrictEqual("#");
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("aaa#bbb ccc", rl)
        expect(ti.getItemValues()).toStrictEqual(["aaa","bbb","ccc"]);
        expect(ti.items[0].mode).toBeNull();
        expect(ti.items[1].mode.keyword).toStrictEqual("#");
        expect(ti.items[2].mode).toBeNull();
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("aaa #bbb ccc", rl)
        expect(ti.getItemValues()).toStrictEqual(["aaa ","bbb","ccc"]);
         expect(ti.items[0].mode).toBeNull();
        expect(ti.items[1].mode.keyword).toStrictEqual("#");
        expect(ti.items[2].mode).toBeNull();
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("h1. aaa",rl)
        expect(ti.getItemValues()).toStrictEqual([ " aaa"]);
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("h1. aaa #bbb", rl)
        expect(ti.getItemValues()).toStrictEqual([ " aaa #bbb"]);
    })

    it('should tokenize properly', function(){

        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("h1. aaa #bbb\nccc", rl)
        expect(ti.getItemValues()).toStrictEqual([ " aaa #bbb","ccc"]);
        expect(ti.items[0].mode.keyword).toStrictEqual("h1.");
        expect(ti.items[1].mode).toBeNull();
    })


    it('should tokenize multiple tags separated by spaces properly', function(){

        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("#aaa #bbb #ccc #ddd", rl)
        expect(ti.getItemValues()).toStrictEqual([ "aaa","bbb","ccc","ddd"]);
    })

    it('should tokenize multiple tags separated by line break properly', function(){

        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("#aaa\n#bbb\n#ccc\n#ddd", rl)
        expect(ti.getItemValues()).toStrictEqual([ "aaa","bbb","ccc","ddd"]);
        expect(ti.getItemModes().map((mode)=>mode.keyword)).toStrictEqual([ "#","#","#","#"]);
    })


    it('should tokenize multiple numeric tags separated by line break properly', function(){

        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("#100\n#200\n#300\n#400", rl)
        expect(ti.getItemValues()).toStrictEqual([ "100","200","300","400"]);
        expect(ti.getItemModes().map((mode)=>mode.keyword)).toStrictEqual([ "#","#","#","#"]);
    })


    it('should handle stopword properly', function(){

        let rl=new ReservedList([new Reserved("#",[" ","\n"])])
        let ti= new TextIterator("")
        expect(ti.startsFromStopWord(" aaa",{stopwords:[" "]})).toStrictEqual(" ");
    })

});
