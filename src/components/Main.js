import Graph from "./Graph";
import Form from "./Form";

export default class Main {
    constructor() {
        const graph = document.getElementById("gradtage-graph");
        const form = document.getElementById("gradtage-form");

        if (graph) {
            this.graph = new Graph(graph);
        }

        if (form) {
            this.form = new Form(form);
        }
    }
}