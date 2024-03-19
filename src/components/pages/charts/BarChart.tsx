import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { getSales } from "../../../services";
import { formatDatetoYYYYMMDD } from "../../../utils/formats";
import Spinner from '../../ui/Spinner';
import { Order } from '../../../types';
import { generateLastPath } from "../../../utils/session";

defaults.maintainAspectRatio = true;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
//defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

type ObjetMonth = {
    name: string;
    number: number;
    amount: number;
};

const BarChart = () => {
    const [salesAmount, setSalesAmount] = useState(0);
    const [message, setMessage] = useState("");

    const [objectMonth, setObjectMonth] = useState<ObjetMonth[]>([]);


    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState({
        startDate: formatDatetoYYYYMMDD(new Date(), "-"),
        endDate: formatDatetoYYYYMMDD(new Date(), "-"),
    });


    useEffect(() => {
        generateLastPath();

        const getAll = async () => {
            try {
                const data = await getSales({
                    limit: 100,
                    startDate: filter.startDate,
                    endDate: filter.endDate,
                });
                if (data.status_code === 200) {
                    setOrders(data.docs);
                    setSalesAmount(data.count);
                    setObjectMonth(getNameMonths(filter.startDate, filter.endDate))
                } else {
                    setError(data.errors[0] || "Ocurrió un error desconocido");
                }
            } catch (error) {
                setError("Ocurrió un error desconocido");
            } finally {
                setIsLoading(false);
            }
        };

        try {
            setIsLoading(true);
            getAll();
        } catch (error) {
            console.log(error);
        }
    }, [salesAmount]);

    const filterSales = async () => {
        try {
            setObjectMonth([]);
            const data = await getSales({
                limit: 100,
                startDate: filter.startDate,
                endDate: filter.endDate,
            });

            if (data.status_code === 200) {

                setOrders(data.docs);
                setSalesAmount(data.count);
                setObjectMonth(getNameMonths(filter.startDate, filter.endDate))

            } else {
                setError(data.errors[0] || "Ocurrió un error desconocido");
            }
        } catch (error) {
            setError("Ocurrió un error desconocido");
        } finally {
            setIsLoading(false);
        }
    };

    const getNameMonths = (startDate: string, endDate: string): ObjetMonth[] => {
        const month: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']
        const numberMonth: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        const monthsNameFilter: string[] = []
        const numberMonthFilter: number[] = []

        var fechaInicio = new Date(startDate).getTime();
        var fechaFin = new Date(endDate).getTime();

        var diff = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);

        if (diff >= 336) {
            setMessage('Solo se puede establecer un rango máximo de 12 meses')
        } else {
            if (parseInt(startDate.substring(5, 7)) === parseInt(endDate.substring(5, 7))) {
                monthsNameFilter.push(month[parseInt(startDate.substring(5, 7)) - 1])
                numberMonthFilter.push(numberMonth[parseInt(startDate.substring(5, 7)) - 1])

            } else {
                if (parseInt(startDate.substring(5, 7)) > parseInt(endDate.substring(5, 7))) {
                    for (let index = parseInt(startDate.substring(5, 7)); index <= 12; index++) {
                        monthsNameFilter.push(month[index - 1])
                        numberMonthFilter.push(numberMonth[index - 1])
                    }
                    for (let index = 1; index <= parseInt(endDate.substring(5, 7)); index++) {
                        monthsNameFilter.push(month[index - 1])
                        numberMonthFilter.push(numberMonth[index - 1])
                    }
                } else {
                    for (let index = parseInt(startDate.substring(5, 7)); index <= parseInt(endDate.substring(5, 7)); index++) {
                        monthsNameFilter.push(month[index - 1])
                        numberMonthFilter.push(numberMonth[index - 1])
                    }
                }
            }
        }
        const monthsSales: number[] = [];
        orders.forEach(date => monthsSales.push(new Date(date.reception_date).getMonth()))

        const specimens = monthsSales.filter((number, i) => i == 0 ? true : monthsSales[i - 1] != number);
        const counterSpecimens = specimens.map(spec => {
            return { number: spec, count: 0 };
        });

        counterSpecimens.map((countSpec, i) => {
            const actualSpecLength = monthsSales.filter(number => number === countSpec.number).length;
            countSpec.count = actualSpecLength;
        })

        const newObject: ObjetMonth[] = [];
        monthsNameFilter.forEach((value: string, index: number) => {
            newObject.push({ name: value, number: numberMonthFilter[index], amount: 0 })
        })

        newObject.map((value) => {
            counterSpecimens.filter(number => number.number + 1 === value.number ? value.amount = number.count : 0)
        })
        return newObject;
    }
    return (
        <>
            <div className="flex flex-col md:flex-row container px-4 mx-auto">
                <h1 className="text-center md:text-left font-bold text-lg">
                    Ventas realizadas
                </h1>
            </div>
            <div className="flex w-full xl:w-4/6 my-2 container px-4 mx-auto gap-2">
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                    type="date"
                    value={filter.startDate}
                    onChange={(ev) =>
                        setFilter({
                            ...filter,
                            startDate: formatDatetoYYYYMMDD(new Date(ev.target.value), "-"),
                        })
                    }
                ></input>
                <input
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                    type="date"
                    value={filter.endDate}
                    onChange={(ev) =>
                        setFilter({
                            ...filter,
                            endDate: formatDatetoYYYYMMDD(new Date(ev.target.value), "-"),
                        })
                    }
                ></input>
                <button
                    className="mt-1 text-center rounded bg-slate-700 px-3 py-2 text-lg text-white text-normal font-bold"
                    onClick={filterSales}
                >
                    Filtrar
                </button>
            </div>
            <div className="flex w-full flex-wrap">
                {isLoading && <Spinner />}
                {error ? <p>{error}</p> : null}
                {salesAmount !== 0
                    ?
                    <Bar
                        data={{
                            labels: objectMonth.map(value => value.name),
                            datasets: [
                                {
                                    label: "Count",
                                    data: objectMonth.map(value => value.amount),
                                    backgroundColor: [
                                        "rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                    ],
                                    borderRadius: 5,
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Cantidad de ventas por rango de meses",
                                },
                            },
                        }}
                    />
                    : message}
            </div>
        </>

    )
}

export default BarChart