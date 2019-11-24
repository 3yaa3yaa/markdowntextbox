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

});
