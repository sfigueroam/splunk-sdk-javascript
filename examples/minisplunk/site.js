// Copyright 2011 Splunk, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License"): you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

var SearchApp = Backbone.Router.extend({
  initialize: function() {
    window.App = this;
    
    _.bindAll(this, "search", "jobs", "signedIn");
    
    this.events = _.extend({}, Backbone.Events);
    this.events.bind("service:login", this.signedIn);
    
    this.searchView = new SearchView();
    this.jobsView = new JobManagerView();
    this.navBarView = new NavBarView({el: "#navbar"});
    
    this.navBarView.render();
    this.searchView.render();
    this.jobsView.render();
  },
  
  routes: {
    "" : "search",
    "search" : "search",
    "jobs": "jobs"
  },
  
  signedIn: function(service) {
    console.log("signed in:", service);
    console.log(this);
    this.service = service;
    this.jobsView.jobs.fetch();
  },
  
  search : function() {
    this.setNavigationHighlight("search");
    
    $("#content").detach();
    $("#content-container").append(this.searchView.el);
  },
  
  jobs : function() {
    this.setNavigationHighlight("jobs");
    
    $("#content").detach();
    $("#content-container").append(this.jobsView.el);
  },
  
  setNavigationHighlight: function(view) {
    $("#navbar li").each(function(index, elem) {
      $(elem).removeClass("active");
      
      var href = $(elem).children("a").attr("href") || "";
      if (href.substring(1) === view) {
        $(elem).addClass("active");
      }
    });
  }
});

$(document).ready(function() {
  process.nextTick(function() {
    var app = new SearchApp();
    Backbone.history.start();
  });    
});