import React from 'react';
import { shallow, mount, render } from 'enzyme';
import MarkdownTextBox from "../src/index";

describe('A suite', function() {
    it('should have two div', function(){
        const wrapper = shallow(<MarkdownTextBox />);
        expect(wrapper.find('div').length).toBe(2);
    })


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
