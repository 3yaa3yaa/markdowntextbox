import React from 'react';
import TextIterator from "../src/TextIterator";
import { ReservedList } from "../src/Reserved";

describe('A suite', function() {
    it('should tokenize properly', function(){
        let rl=new ReservedList([{keyword: "#", stopwords: [" ","\n"]}])
        let ti= new TextIterator("aaa", rl)
        expect(ti.getItemValues()).toStrictEqual(["aaa"]);
        expect(ti.items[0].mode).toBeNull();
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([{keyword: "#", stopwords: [" ","\n"]}])
        let ti= new TextIterator("aaa#bbb", rl)
        expect(ti.getItemValues()).toStrictEqual(["aaa","bbb"]);
        expect(ti.items[0].mode).toBeNull();
        expect(ti.items[1].mode.keyword).toStrictEqual("#");
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([{keyword: "#", stopwords: [" ","\n"]}])
        let ti= new TextIterator("aaa#bbb ccc", rl)
        expect(ti.getItemValues()).toStrictEqual(["aaa","bbb","ccc"]);
        expect(ti.items[0].mode).toBeNull();
        expect(ti.items[1].mode.keyword).toStrictEqual("#");
        expect(ti.items[2].mode).toBeNull();
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([{keyword: "#", stopwords: [" ","\n"]}])
        let ti= new TextIterator("aaa #bbb ccc", rl)
        expect(ti.getItemValues()).toStrictEqual(["aaa ","bbb","ccc"]);
         expect(ti.items[0].mode).toBeNull();
        expect(ti.items[1].mode.keyword).toStrictEqual("#");
        expect(ti.items[2].mode).toBeNull();
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([{keyword: "#", stopwords: [" ","\n"]}])
        let ti= new TextIterator("h1. aaa",rl)
        expect(ti.getItemValues()).toStrictEqual([ " aaa"]);
    })

    it('should tokenize properly', function(){
        let rl=new ReservedList([{keyword: "#", stopwords: [" ","\n"]}])
        let ti= new TextIterator("h1. aaa #bbb", rl)
        expect(ti.getItemValues()).toStrictEqual([ " aaa #bbb"]);
    })

    it('should tokenize properly', function(){

        let rl=new ReservedList([{keyword: "#", stopwords: [" ","\n"]}])
        let ti= new TextIterator("h1. aaa #bbb\nccc", rl)
        expect(ti.getItemValues()).toStrictEqual([ " aaa #bbb","ccc"]);
        expect(ti.items[0].mode.keyword).toStrictEqual("h1.");
        expect(ti.items[1].mode).toBeNull();
    })

    it('should handle stopword properly', function(){

        let rl=new ReservedList([{keyword: "#", stopwords: [" ","\n"]}])
        let ti= new TextIterator("")
        expect(ti.startsFromStopWord(" aaa",{stopwords:[" "]})).toStrictEqual(" ");
    })

});
