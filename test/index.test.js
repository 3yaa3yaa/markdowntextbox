import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MarkdownTextBox from "../src/index";

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

    // it('should calculate properly', function(){
    //     const wrapper = shallow(<MarkdownTextBox />);
    //     wrapper.setState({markdownvalue:"=1+2*3"});
    //     expect(wrapper.find('.description').text()).toBe("7");
    //     wrapper.setState({markdownvalue:"=2+2*3"});
    //     expect(wrapper.find('.description').text()).toBe("8");
    //     wrapper.setState({markdownvalue:"=1+2*5+(3+5)"});
    //     expect(wrapper.find('.description').text()).toBe("19");
    //     wrapper.setState({markdownvalue:"=1"});
    //     expect(wrapper.find('.description').text()).toBe("1");
    // })


    // it('should render without throwing an error', function() {
    //     expect(shallow(<MarkdownTextBox focus={false} />).contains(<div></div>)).toBe(true);
    // });
    //
    // it('should be selectable by class "foo"', function() {
    //     expect(shallow(<MarkdownTextBox />).is('.foo')).toBe(true);
    // });
    //
    // it('should mount in a full DOM', function() {
    //     expect(mount(<MarkdownTextBox />).find('.foo').length).toBe(1);
    // });
    //
    // it('should render to static HTML', function() {
    //     expect(render(<MarkdownTextBox />).text()).toEqual('Bar');
    // });
});
