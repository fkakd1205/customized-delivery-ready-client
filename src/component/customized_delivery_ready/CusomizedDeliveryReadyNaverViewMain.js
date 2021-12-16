import {useState, useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

// component
import CustomizedDeliveryReadyNaverViewBody from './CustomizedDeliveryReadyNaverViewBody';
import { customizedDeliveryReadyNaverDataConnect } from '../../data_connect/customizedDeliveryReadyNaverDataConnect';

const CustomizedDeliveryReadyNaverViewMain = (props) => {
    const [customizedDeliveryReadyData, setCustomizedDeliveryReadyData] = useState(null);
    // const [customHeader, setCustomHeader] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const [customizedDetails, setCustomizedDetails] = useState(null);
    const [customHeaderTitle, setCustomHeaderTitle] = useState(null);
    const [selectedCustomHeader, setSelectedCustomHeader] = useState(null);
    const [selectedCustomTitle, setSelectedCustomTitle] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            await __handleDataConnect().getAllCustomTableHeaderTitle();
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
            getSelectedCustomTableHeaderData : async function (titleId) {
                await customizedDeliveryReadyNaverDataConnect().searchCustomizedTableHeader(titleId)
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setSelectedCustomHeader(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : getAllCustomTableHeader');
                    })
            },
            getSelectedCustomDeliveryReadyItem: async function (titleId) {
                await customizedDeliveryReadyNaverDataConnect().searchSelectedCustomDeliveryReadyItem(titleId)
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            let data = res.data.data;
                            let customizedData = data.map(r => r.customizedDeliveryReadyItem);

                            setCustomizedDeliveryReadyData(res.data.data);
                            setCustomizedDetails(customizedData)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : getSelectedCustomDeliveryReadyItem');
                    })
            },
            getAllCustomTableHeaderTitle: async function () {
                await customizedDeliveryReadyNaverDataConnect().searchCustomizedTableHeaderTitle()
                    .then(res => {
                        if (res.status === 200 && res.data && res.data.message === 'success') {
                            setCustomHeaderTitle(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : getAllCustomTableHeader');
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
            },
            customizedHeader: function () {
                return {
                    moveAddPage: function () {
                        props.history.push('/delivery-ready/customized-header/create');
                    },
                    moveEditPage: function () {
                        props.history.push('/delivery-ready/customized-header/modify');
                    },
                    changeCustomTableHeader: async function (e, headerTitle) {
                        e.preventDefault();
                        await __handleDataConnect().getSelectedCustomTableHeaderData(headerTitle.id);
                        setSelectedCustomTitle(headerTitle)
                        await __handleDataConnect().getSelectedCustomDeliveryReadyItem(headerTitle.id);
                    }
                }
            }
        }
    }

    return (
        <>
            <CustomizedDeliveryReadyNaverViewBody
                customizedDeliveryReadyData={customizedDeliveryReadyData}
                customHeaderTitle={customHeaderTitle}
                customizedDetails={customizedDetails}
                selectedCustomHeader={selectedCustomHeader}
                selectedCustomTitle={selectedCustomTitle}

                __handleEventControl={__handleEventControl}
            ></CustomizedDeliveryReadyNaverViewBody>
        </>
    )
}

export default withRouter(CustomizedDeliveryReadyNaverViewMain);