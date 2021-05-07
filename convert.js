import fs from 'fs';
import Enumerable from "linq";
import BpmnModdel from 'bpmn-moddle';
import { Ac4yKeyValueMemory } from './Ac4y.js'

const moddle = new BpmnModdel();

async function xmlToModdleJS(fileName) {

    try {

        let xml = fs.readFileSync("./xml/" + fileName, "utf-8");

        const {
            rootElement: definitions
        } = await moddle.fromXML(xml);

        return definitions;

    } catch (error) {
        console.log(error);
    }

} // xmlToModdleJS

async function moddleJSToSyncfusionJS() {

    let moddleObject = await xmlToModdleJS("osszetettebbPeldaGateway.xml");

    let moddleArray = moddleObject.diagrams[0].plane.planeElement;

    console.log(moddleArray);

    let nodeArray = [];
    let connectorArray = [];

    let syncfusionElements = await Enumerable.from(moddleArray)
        .select((object) => {

            let syObject = {};

            if(object.$type.includes("Shape")) {

                if (object.bpmnElement.$type.includes("Event")) {

                    if (object.bpmnElement.$type.includes("Start")) {

                        syObject = {
                            id: object.bpmnElement.id, width: object.bounds.width, height: object.bounds.height,
                            offsetX: object.bounds.x, offsetY: object.bounds.y,
                            annotations: [{
                                content: object.bpmnElement.name != undefined ? object.bpmnElement.name : ""
                            }],
                            shape: {
                                type: 'Bpmn', shape: 'Event',
                                event: {
                                    event: 'Start'
                                }
                            }
                        };

                        nodeArray.push(syObject);

                        return syObject;

                    } else if (object.bpmnElement.$type.includes("End")) {

                        syObject = {
                            id: object.bpmnElement.id, width: object.bounds.width, height: object.bounds.height,
                            offsetX: object.bounds.x, offsetY: object.bounds.y,
                            annotations: [{
                                content: object.bpmnElement.name != undefined ? object.bpmnElement.name : ""
                            }],
                            shape: {
                                type: 'Bpmn', shape: 'Event',
                                event: {
                                    event: 'End'
                                }
                            }
                        };

                        nodeArray.push(syObject);

                        return syObject;

                    }

                } else if (object.bpmnElement.$type.includes("Gateway")) {

                    if (object.bpmnElement.$type.includes("Exclusive")) {

                        syObject = {
                            id: object.bpmnElement.id, width: object.bounds.width, height: object.bounds.height,
                            offsetX: object.bounds.x, offsetY: object.bounds.y,
                            annotations: [{
                                content: object.bpmnElement.name != undefined ? object.bpmnElement.name : ""
                            }],
                            shape: {
                                type: 'Bpmn', shape: 'Gateway',
                                gateway: {
                                    type: 'Exclusive'
                                }
                            }
                        };

                        nodeArray.push(syObject);

                        return syObject;

                    }

                } else if (object.bpmnElement.$type.includes("Activity")) {

                    if (object.bpmnElement.$type.includes("Call")) {

                        syObject = {
                            id: object.bpmnElement.id, width: object.bounds.width, height: object.bounds.height,
                            offsetX: object.bounds.x, offsetY: object.bounds.y,
                            annotations: [{
                                content: object.bpmnElement.name != undefined ? object.bpmnElement.name : ""
                            }],
                            shape: {
                                type: 'Bpmn', shape: 'Activity',
                                activity: {
                                    activity: 'SubProcess',
                                    subProcess: {
                                        boundary: "Call"
                                    }
                                }
                            }
                        };

                        nodeArray.push(syObject);

                        return syObject;

                    }

                } else if (object.bpmnElement.$type.includes("Task")) {

                    if (object.bpmnElement.$type.includes("Service")) {

                        syObject = {
                            id: object.bpmnElement.id, width: object.bounds.width, height: object.bounds.height,
                            offsetX: object.bounds.x, offsetY: object.bounds.y,
                            annotations: [{
                                content: object.bpmnElement.name != undefined ? object.bpmnElement.name : ""
                            }],
                            shape: {
                                type: 'Bpmn', shape: 'Activity',
                                activity: {
                                    activity: 'Task',
                                    task: {
                                        type: "Service"
                                    }
                                }
                            }
                        };

                        nodeArray.push(syObject);

                        return syObject;

                    }
                }
            } // if shape

            if(object.$type.includes("Edge")) {



            } // if edge

        }).toArray() // syncfusionElements

    console.log(nodeArray);

} // moddleJSToSyncfusionJS

moddleJSToSyncfusionJS();
