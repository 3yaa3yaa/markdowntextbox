import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MarkdownTextBox } from "../src/index";

describe('A suite', function() {
    it('should have full elements', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        expect(wrapper.find('.description').length).toBe(1);
        expect(wrapper.find('.top').length).toBe(1);
        expect(wrapper.find('.text').length).toBe(1);
    })

    it('should have proper description', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        wrapper.setState({markdownvalue:"foobar"});
        expect(wrapper.find('.description').text()).toBe("foobar");
    })


    it('should renders h1 properly', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        wrapper.setState({markdownvalue:"h1.foobar"});
        expect(wrapper.find('.description').text()).toBe("foobar");
    })

    it('should renders h2 properly', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        wrapper.setState({markdownvalue:"h2.foobar"});
        expect(wrapper.find('.description').text()).toBe("foobar");
    })


    it('should renders h3 properly', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        wrapper.setState({markdownvalue:"h3.foobar"});
        expect(wrapper.find('.description').text()).toBe("foobar");
    })


    it('should renders h4 properly', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        wrapper.setState({markdownvalue:"h4.foobar"});
        expect(wrapper.find('.description').text()).toBe("foobar");
    })

    it('should renders h5 properly', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        wrapper.setState({markdownvalue:"h5.foobar"});
        expect(wrapper.find('.description').text()).toBe("foobar");
    })

    it('should renders h6 properly', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        wrapper.setState({markdownvalue:"h6.foobar"});
        expect(wrapper.find('.description').text()).toBe("foobar");
    })


    it('should renders bold properly', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        wrapper.setState({markdownvalue:"*foobar*"});
        expect(wrapper.find('.description').text()).toBe("foobar");
    })

    it('should renders codeline properly', function(){
        let test ="Among other public buildings in a certain town, which for many reasons it will be prudent to refrain from mentioning, and to which I will assign no fictitious name, there is one anciently common to most towns, great or small: to wit, a workhouse; and in this workhouse was born; on a day and date which I need not trouble myself to repeat, inasmuch as it can be of no possible consequence to the reader, in this stage of the business at all events; the item of mortality whose name is prefixed to the head of this chapter.\n" +
            "For a long time after it was ushered into this world of sorrow and trouble, by the parish surgeon, it remained a matter of considerable doubt whether the child would survive to bear any name at all; in which case it is somewhat more than probable that these memoirs would never have appeared; or, if they had, that being comprised within a couple of pages, they would have possessed the inestimable merit of being the most concise and faithful specimen of biography, extant in the literature of any age or country."

        const wrapper = render(<MarkdownTextBox value={"`"+ test +"`"}/>);
        let fs = require("fs");
        fs.writeFileSync("./test/__html__/index.test.codeline_longtext.html", wrapper.html());

        const wrapper2 = mount(<MarkdownTextBox value={"`"+ test +"`"}/>);
        expect(wrapper2.find('.description').at(0).text()).toEqual(expect.stringContaining("Among other public buildings"));
    })

    it('should renders codeline properly', function(){
        let test ="foo\nbar\nbaz"
        const wrapper = render(<MarkdownTextBox value={"`"+ test +"`"}/>);
        let fs = require("fs");
        fs.writeFileSync("./test/__html__/index.test.codeline_shorttext.html", wrapper.html());


        const wrapper2 = mount(<MarkdownTextBox value={"`"+ test +"`"}/>);
        expect(wrapper2.find('.description').at(0).text()).toEqual(expect.stringContaining("foo"));

    })



});
