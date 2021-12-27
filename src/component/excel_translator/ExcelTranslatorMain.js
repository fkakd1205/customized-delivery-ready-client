import axios from 'axios';
import {useState, useEffect} from 'react';
import { withRouter } from 'react-router';

import ExcelTranslatorBody from "./ExcelTranslatorBody";
import { excelTranslatorDataConnect } from '../../data_connect/excelTranslatorDataConnect';

const ExcelTranslatorMain = () => {

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().searchExcelTranslatorHeader();
        }

        fetchInit();
    }, [])

    const __handleDataConnect = () => {
        return {
            searchExcelTranslatorHeader: async function () {
                await excelTranslatorDataConnect().searchList()
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            console.log(res.data.data);
                        }
                    })
                    .catch(err => {
                       console.log(err); 
                    });
            },
            createUploadHeader: async function (data) {
                await excelTranslatorDataConnect().postOne(data)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            console.log(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }

    const __handleEventControl = () => {
        return {
            uploadHeader: function () {
                return {
                    createOne: async function (data) {
                        await __handleDataConnect().createUploadHeader(data);
                    }
                }
            }
        }
    }

    return (
        <>
            <ExcelTranslatorBody

                __handleEventControl={__handleEventControl}
            ></ExcelTranslatorBody>
        </>
    )
}

export default withRouter(ExcelTranslatorMain);