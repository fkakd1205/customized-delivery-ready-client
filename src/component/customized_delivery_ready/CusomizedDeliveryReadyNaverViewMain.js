import {useState, useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

// component
import CustomizedDeliveryReadyNaverViewBody from './CustomizedDeliveryReadyNaverViewBody';
import { customizedDeliveryReadyNaverDataConnect } from '../../data_connect/customizedDeliveryReadyNaverDataConnect';

const CustomizedDeliveryReadyNaverViewMain = () => {
    const [customizedDeliveryReadyData, setCustomizedDeliveryReadyData] = useState(null);
    const [customHeader, setCustomHeader] = useState(null);
    const [excelData, setExcelData] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().getAllCustomTableHeader();
            await __handleDataConnect().getAllCustomDeliveryReadyItem();
        }

        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return{
            changeCustomizedOrderForm: async function () {
                await customizedDeliveryReadyNaverDataConnect().changeToCustomizedForm(excelData)
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setCustomizedDeliveryReadyData(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : changeCustomizedOrderForm');
                    })
            },
            getAllCustomTableHeader : async function () {
                await customizedDeliveryReadyNaverDataConnect().searchCustomizedTableHeader()
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setCustomHeader(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : getAllCustomTableHeader');
                    })
            },
            getAllCustomDeliveryReadyItem: async function () {
                await customizedDeliveryReadyNaverDataConnect().searchAllCustomDeliveryReadyItem()
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setCustomizedDeliveryReadyData(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : getAllCustomDeliveryReadyItem');
                    })
            }
        }
    }
    
    const __handleEventControl = () => {
        return{
            changeCustomizedOrderForm: function () {
                return {
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().changeCustomizedOrderForm();
                    }
                }
            }
        }
    }

    return (
        <>
            <CustomizedDeliveryReadyNaverViewBody
                customizedDeliveryReadyData={customizedDeliveryReadyData}
                customHeader={customHeader}

                __handleEventControl={__handleEventControl}
            ></CustomizedDeliveryReadyNaverViewBody>
        </>
    )
}

export default withRouter(CustomizedDeliveryReadyNaverViewMain);