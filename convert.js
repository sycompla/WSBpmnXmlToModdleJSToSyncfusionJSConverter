import fs from 'fs';
import Enumerable from "linq";
import BpmnModdel from 'bpmn-moddle';
import { Ac4yKeyValueMemory } from './Ac4y.js'

const moddle = new BpmnModdel();

async function xmlToModdleJS(fileName) {

    try {

        let xml = fs.fileReadSync("./xml/" + fileName, "utf-8");

        const {
            rootElement: definitions
        } = await moddle.fromXML(xml);

        return definitions;

    } catch (error) {
        console.log(error);
    }

} // xmlToModdleJS

async function moddleJSToSyncfusionJS() {

    let moddleObject = await xmlToModdleJS("osszetettebbPeldaGateway");

} // moddleJSToSyncfusionJS
