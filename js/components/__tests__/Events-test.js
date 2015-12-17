import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Events from '../Events';
import { expect } from 'chai';

describe("Events", function() {

  let renderedComponent;

  beforeEach(function() {
    renderedComponent = TestUtils.renderIntoDocument(<Events />);
  });

  it("should render", function() {
    expect(renderedComponent).to.be.defined;
  });

});

