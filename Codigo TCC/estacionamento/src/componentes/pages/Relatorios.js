import { Chart } from "react-google-charts";
import styles from '../css_pages/relatorios.module.css';
import Navbar from "../layout/Navbar";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { api } from "../apiClient.mjs";
import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs

function Relatorios(){
const [ datas,setDatas ] = useState([])
const [ datasCLient,setDataClient ] = useState([])
const [dataPag,setDataPag] = useState([])
const [ vendaPorDia,setVendaPorDia ] = useState([])
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');


const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');


const dateString = `${day}/${month}/${year}`;

const timeString = `${hours}:${minutes}:${seconds}`;

const dateTimeString = `${dateString} ${timeString}`;

const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem("token")
    
        if(token){
            navigate('/relatorios');
        } 
        else{
            navigate('/');
            }
        
        async function vendasAPI(){
            const response = (api).get('/relatorios/vendas-soma')
            setDatas((await response).data)

            const responseClient = (api).get('/relatorios/tipos-clientes')
            setDataClient(((await responseClient).data))

            const responsePag = (api).get('/relatorios/tipos-pagamentos')
            setDataPag((await responsePag).data)

            const responseDias = (api).get('/relatorios/vendas-por-dia')
            setVendaPorDia((await responseDias).data)
            
        }

        vendasAPI()

    },[])
  
    console.log(vendaPorDia)

    //VALUES  RELATÓRIOS API
    
    const data = [
        ["Funcionário", "Vendas R$"],
        ...datas.map((item) => [item.nome,item.soma])
      ];

    const options = {
    title: "Vendas por funcionário",
    titleTextStyle: { color:"#FFF", fontSize: 16, fontFamily:"Josefin Sans" },
    legend: { position: "none" },
    colors: ["#27AE60", "#d95f02"],
    backgroundColor:"#161717",
    width: "100%",
    height: "400px",
    bar: { groupWidth: "75%" },
    hAxis:{
        title:"Funcionários",
        textStyle:{color: "#FFF" ,fontSize:16},
        titleTextStyle: { color:"#FFF", fontSize: 16 },
    },
    vAxis:{
        title:"Vendas",
        textStyle:{color: "#FFF" ,fontSize:16},
        titleTextStyle: { color:"#FFF", fontSize: 16 },
    }
    };

    const mensalistas = datasCLient[0]?.countMensalistas
    const temporarios = datasCLient[1]?.countMensalistas
    

    const dataClient = [
        ['Clientes', 'Números de Clientes'],
        ['Mensalistas',     mensalistas],
        ['Temporários',     temporarios]
      ]
  

      const optionsClient = {
        title: "% de Clientes",
        titleTextStyle: { color: "#FFF", fontSize: 18 },
        legend: { position: "bottom", alignment: "center", textStyle: { color: "#FFF", fontSize: 14 } },
        colors: ["#002147", "#3182bd"],
        backgroundColor: "#161717",
        pieSliceBorderColor: "#f5f5f5",
        pieSliceTextStyle: { color: "#FFF", fontSize: 14 },
        pieHole: 0.4,
        animation: {
          startup: true,
          easing: "linear",
          duration: 1500
        }
      }

      const dataPayments = [
        ["Pagamentos", "Total"],
        ...dataPag.map((data) => [data.nome_pagamento,data.soma])
      ];

      const optionsPag = {
        title: "Vendas por Pagamento",
        titleTextStyle: { color:"#FFF", fontSize: 16, fontFamily:"Josefin Sans" },
        legend: { position: "none" },
        colors: ['#f8fb59'],
        width: "100%",
        backgroundColor: "#161717",
        height: "400px",
        bar: { groupWidth: "75%" },
        hAxis:{
            title:"Formas de Pagamento",
            textStyle:{color: "#FFF" ,fontSize:16},
            titleTextStyle: { color:"#FFF", fontSize: 16 },
        }
        };

        const dataDays = [
          ["Dias", "Total de Vendas"],
          ...vendaPorDia.map((data) => [data.dia_da_semana,data.total_vendas])
        ];

        const optionsDays = {
          title: "Vendas por Dia",
          titleTextStyle: { color:"#FFF", fontSize: 16, fontFamily:"Josefin Sans" },
          legend: { position: "none" },
          colors: ["#d95f02"],
          backgroundColor:"#161717",
          width: "100%",
          height: "400px",
          bar: { groupWidth: "75%" },
          hAxis:{
              title:"Dias da Semana",
              textStyle:{color: "#FFF" ,fontSize:16},
              titleTextStyle: { color:"#FFF", fontSize: 16 },
          },
          vAxis:{
              title:"Total de Vendas",
              textStyle:{color: "#FFF" ,fontSize:16},
              titleTextStyle: { color:"#FFF", fontSize: 16 },
          }
          };
          

          const table1 = [["Dias","Total"],...vendaPorDia.map((data) => [data.dia_da_semana,data.total_vendas]) ];

          const table2 = [ ["Pagamentos", "Total"],...dataPag.map((data) => [data.nome_pagamento,data.soma])];

          const table3 = [["Funcionário", "Vendas R$"],...datas.map((item) => [item.nome,item.soma])]

          const table4 = [ ['Clientes', 'Números de Clientes'],
          ['Mensalistas',     mensalistas],
          ['Temporários',     temporarios]]


const documentDefinition = {
  content: [
    { text: 'Relatórios System Park', style: 'header' },
    {text: `Data: ${dateString}`, style:'subheader', fontSize: 10, bold: false, margin: [0, 8, 0, 8]},
    {text: 'Vendas por Dia:', fontSize: 14, bold: true, margin: [0, 8, 0, 8]},
    {
      table: {
        widths: [300, '*', 100, '*'],
        body: table1
      },
      layout: {
				fillColor: function (rowIndex, node, columnIndex) {
				  return (rowIndex % 2 !== 0) ? '#CCCCCC' : null;
				}
			}
    },
    {text: 'Pagamentos:', fontSize: 14, bold: true, margin: [0, 8, 0, 8]},
    {
      table: {
        widths: [300, '*', 100, '*'],
        body: table2
      },
      layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					return (rowIndex % 2 !== 0) ? '#CCCCCC' : null;
				}
			}
    },
    {text: 'Vendas por Funcionário:', fontSize: 14, bold: true, margin: [0, 8, 0, 8]},
    {
      table: {
        widths: [300, '*', 100, '*'],
        body: table3
      },
      layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					return (rowIndex % 2 !== 0) ? '#CCCCCC' : null;
				}
			}
    },
    {text: '% de Clientes:', fontSize: 14, bold: true, margin: [0, 8, 0, 8]},
    {
      table: {
        widths: [300, '*', 100, '*'],
        body: table4
      },
      	layout: {
				fillColor: function (rowIndex, node, columnIndex) {
					return (rowIndex % 2 !== 0) ? '#CCCCCC' : null;
				}
			}
    }
  ],
  styles: {
    header: {
      fontSize: 22,
      bold: true,
      margin: [0, 20, 0, 20]
    }
  }
};

          function generatePDF() {
            pdfMake.createPdf(documentDefinition).open();
          }
          
          

      


    return (
    <div className={styles.container}>
        <Navbar/>
        <button onClick={generatePDF}>Teste</button>
        <div className={styles.bodyGraficos}>
              <h1>Gráficos</h1>
              <button onClick={generatePDF} className={styles.btnRelatorio}>Gerar Relatório</button>
            <div className = {styles.graficos}>
           
              <div>
                
                <Chart
                  chartType="LineChart"
                  data={data}
                  options={options}
                  width="500px"
                  height="400px"
                  />
                 
              </div>
                

              <div>
               <Chart
                chartType="PieChart"
                data={dataClient}
                options={optionsClient}
                width="500px"
                height="400px"
                />
              </div>


              <div>
               <Chart
                chartType="ColumnChart"
                data={dataPayments}
                options={optionsPag}
                width="500px"
                height="400px"
                />
              </div>

             <div>
               <Chart
                chartType="ColumnChart"
                data={dataDays}
                options={optionsDays}
                width="500px"
                height="400px"
                />
            </div>
            </div>
       
        </div>
       
    </div>
    )
}

export default Relatorios;