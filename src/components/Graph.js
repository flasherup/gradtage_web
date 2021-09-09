import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {copyAllFields} from "../utils/object";

export default class Graph {
    constructor(container) {
        am4core.useTheme(am4themes_animated);
        this.initialize(container);
    }

    update(data) {
        //const monthly = this.calculateMonthlyData(data);
        const monthly = data;
        console.log("this.chart.data.length", this.chart.data.length, "monthly.length", monthly.length)
        if (this.chart.data.length === monthly.length) {
            console.log("smooth")
            monthly.forEach((dataItem, i) => {
                copyAllFields(this.chart.data[i], dataItem)
            })
            this.chart.invalidateRawData();
            this.chart.series.each((series, i) => {
                series.deepInvalidate();
            })
        } else {
            this.chart.data = monthly;
        }
    }

    updateTitle(t) {
        const e = "hdd" === t.output ? "Heizgradtage (" + t.hdd + "°C)" : "Gradtagzahl (" + t.dd + "°C/" + t.hdd + "°C)";
        this.dateAxis.title.text = e + " in " + t.city + " von " + this.formatDate(t.start) + " - " + this.formatDate(t.end)
    }

    initialize(container) {
        const chart = am4core.create(container, am4charts.XYChart);
        this.chart = chart;
        chart.zoomOutButton.disabled = !0;
        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.dataFields.category = "date";
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.renderer.labels.template.fontSize = 12;
        dateAxis.renderer.labels.template.fontWeight = 600;
        dateAxis.renderer.labels.template.fill = am4core.color("#79989d");
        dateAxis.renderer.labels.template.font = "Roboto";
        this.dateAxis = dateAxis;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.fontWeight = '800';
        valueAxis.renderer.labels.template.fontSize = 12;
        valueAxis.renderer.labels.template.fontWeight = 600;
        valueAxis.renderer.labels.template.fill = am4core.color("#79989d");
        valueAxis.renderer.labels.template.font = "Roboto";
        valueAxis.title.text = "Monatlicher Wert";
        valueAxis.title.fontSize = 14;
        valueAxis.title.fontWeight = 600;
        valueAxis.title.fill = am4core.color("#79989d");
        valueAxis.title.font = "Roboto";

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "hdd";
        series.dataFields.dateX = "date";
        series.clustered = false;
        series.tooltipText = "Monatlicher Wert [bold]{valueY}[/]";
        series.columns.template.fill = am4core.color("#2C5265");
        series.columns.template.strokeWidth = 0;
        series.tooltipText = "langjähriges Mittel [bold]{valueY}[/]";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = false;
        chart.cursor.lineY.disabled = false;

    }

    formatDate(src) {
        const date = new Date(src);
        let i = ("0" + (date.getMonth() + 1)).slice(-2);
        return ("0" + date.getDate()).slice(-2) + "." + i + "." + date.getFullYear()
    }

    /*calculateMonthlyData(data) {
        console.log("data", data)
        let oldId, i, date, curId, res = [];
        data.forEach(entry => {
            date = new Date(entry.Date);
            curId = date.getYear() * (date.getMonth() + 1);
            if (oldId !== curId) {
                oldId = curId;
                i = {
                    Date: date,
                    HDD: 0,
                };
                res.push(i);
            }
            const a = parseFloat(entry.HDD, 10);
            if (!isNaN(a)) {
                i.HDD += a;
            }
        })


        console.log("res", res)

        return res.map(t => {
            t.HDD = Math.round(t.HDD);
            return t;
        })
    }*/
}