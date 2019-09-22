import React from 'react';
import ReservedList from "../src/Reserved";

describe('A suite', function() {
    it('should display codelines beautifully', function(){
        let rl=new ReservedList();
        expect((Math.floor(15/10)+1)*(-1)).toStrictEqual(-2);
        expect(rl.getCodeLines("a\na\na\na\na\na\na\na\na\na\na\na\na\na\n")).toStrictEqual(
            "01> a\n02> a\n03> a\n04> a\n05> a\n06> a\n07> a\n08> a\n09> a\n10> a\n11> a\n12> a\n13> a\n14> a\n");
    })

});
