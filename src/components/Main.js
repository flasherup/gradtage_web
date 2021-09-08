import Graph from "./Graph";
import Form from "./Form";
import Loader from "../utils/Loader";

export default class Main {
    constructor() {
        this.loader = new Loader("https://api.energy-data.io", "5yxCagf54lvpqejuW8rA");
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
        console.log("temps", temps);
        if (this.graph) {
            const data = (t => {
                let e = t.split(/\n/g) || [];
                let i = e.shift().split(",");
                return e.map(t => {
                    const e = {}, n = t.split(",");
                    i.forEach((t, i) => {
                        e[t] = n[i]
                    });
                    return e;
                })
            })(temps);
            console.log("data", data);
            this.graph.update(data)
        }
    }
}


export const main = new Main();