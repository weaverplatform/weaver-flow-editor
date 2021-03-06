/**
 * Copyright 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

// If you use this as a template, update the copyright with your own name.

// Sample Node-RED node file


module.exports = function(RED) {
    "use strict";
    // require any external libraries we may need....
    //var foo = require("foo-library");

    // The main node definition - most things happen in here
    function InsetNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;
        this.set = n.set;

        // copy "this" object in case we need it in context of callbacks of other functions.
        var node = this;

        // Do whatever you need to do in here - declare callbacks etc
        // Note: this sample doesn't do anything much - it will only send
        // this message once at startup...
        // Look at other real nodes for some better ideas of what to do....
        var msg = {};
        msg.topic = this.topic;
        msg.payload = this.payload;

        // send out the message to the rest of the workspace.
        // ... this message will get sent at startup so you may not see it in a debug node.

        // respond to inputs....
        this.on('input', function (msg) {
            if (node.set != undefined) {
                var splitted = node.set.split(',');

                var inset = false;
                var i = 0;
                for (i = 0; i < splitted.length; i++) {
                    if (msg.payload === splitted[i]) {
                        inset = true;
                    }
                }
                msg.inset = inset;
                msg.splitted = splitted;
                // in this example just send it straight on... should process it here really
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("inset",InsetNode);
}
