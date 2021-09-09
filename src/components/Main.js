import Graph from "./Graph";
import Form from "./Form";
import Loader from "../utils/Loader";
import {CSVDataParser} from "../utils/data";

export default class Main {
    constructor() {
        const endpoint = "https://api.energy-data.io";
        //const endpoint = "http://localhost:8032";
        const key = "hSlSfSlHmfJtpGqCmfLR";
        this.loader = new Loader(endpoint, key);
        const graph = document.getElementById("gradtage-graph");
        const form = document.getElementById("gradtage-form");
        if (graph) {
            this.initializeGraph(graph);
        }
        if (form) {
            this.initializeForm(form);
        }
    }

    initializeGraph(graph) {
        this.graph = new Graph(graph)
    }

    initializeForm(form) {
        this.form = new Form(form, data => this.onUpdate(data))
        this.form.makeUpdate()
    }

    onUpdate(data) {
        this.loader.loadDegree(data, degree => this.onDataLoaded(degree), erro => {
            console.log(erro)
        })
        this.graph.updateTitle(data)
    }

    onDataLoaded(temps) {
        if (this.graph) {
            const parsed  = CSVDataParser(temps, ";");
            console.log(parsed);
            this.graph.update(parsed.data)
        }
    }
}


export const main = new Main();