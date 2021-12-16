import {useState, useEffect} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router';
import { Container } from '@material-ui/core';
import ModifyCustomizedHeaderBody from './ModifyCustomizedHeaderBody';
import RefFormSelectModal from './modal/RefFormSelectModal';

import { customizedDeliveryReadyNaverDataConnect } from '../../data_connect/customizedDeliveryReadyNaverDataConnect';

class CustomTableHeader {
    constructor(title = '') {
        this.id = uuidv4();
        this.title = title;
        this.customName = '';
        this.refFormId = null;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            customName: this.customName,
            refFormId: this.refFormId
        }
    }
}

const ModifyCustomizedHeaderMain = () => {
    const [customizedHeader, setCustomizedHeader] = useState(new CustomTableHeader().toJSON());
    const [customizedHeaderList, setCustomizedHeaderList] = useState([]);
    const [refFormSelectModalOpen, setRefFormSelectModalOpen] = useState(false);
    const [refFormData, setRefFormData] = useState(null);
    const [clickedHeaderId, setClickedHeaderId] = useState(null);
    const [storageTitleName, setStorageTitleName] = useState(null);

    useEffect(() => {
        async function fetchInit() {
            setCustomizedHeaderList(customizedHeaderList.concat(customizedHeader));
            __handleDataConnect().searchRefForm();
        }

        fetchInit();
    }, []);

    const __handleDataConnect = () => {
        return {
            searchRefForm: async function () {
                await customizedDeliveryReadyNaverDataConnect().searchRefForm()
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setRefFormData(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : searchRefForm');
                    })
            },
            postCreateCustomTableHeaderList: async function () {
                console.log(customizedHeaderList);
                await customizedDeliveryReadyNaverDataConnect().postCreateCustomTableHeaderList(customizedHeaderList)
                    .then(res => {
                        if(res.status === 200 && res.data && res.data.message === 'success') {
                            setRefFormData(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('undefined error. : postCreateCustomTableHeaderList');
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            customizedHeader: function () {
                return {
                    addCell: async function (e) {
                        e.preventDefault();
                        let newHeader = new CustomTableHeader().toJSON();
                        newHeader.title = storageTitleName;
                        setCustomizedHeaderList(customizedHeaderList.concat(newHeader));
                    },
                    deleteCell: async function (e, headerId) {
                        e.preventDefault();

                        if(customizedHeaderList.length > 1){
                            setCustomizedHeaderList(customizedHeaderList.filter(r => r.id !== headerId));
                        }
                    },
                    onChangeInputValue: function (e, headerId) {
                        e.preventDefault();

                        setCustomizedHeaderList(customizedHeaderList.map(customHeader => {
                            if (customHeader.id === headerId) {
                                return {
                                    ...customHeader,
                                    customColName : e.target.value
                                }
                            } else {
                                return customHeader;
                            }
                        }))
                    },
                    submit: async function (e) {
                        e.preventDefault();
                        await __handleDataConnect().postCreateCustomTableHeaderList();
                    }
                }
            },
            refForm: function () {
                return {
                    refFormModalOpen: async function (e, headerId) {
                        e.preventDefault();
                        setRefFormSelectModalOpen(true);
                        setClickedHeaderId(headerId);
                    },
                    refFormModalClose: function () {
                        setRefFormSelectModalOpen(false);
                    },
                    selectRefForm: async function (refFormData) {
                        let changedHeader = customizedHeaderList.map(r =>
                            (r.id === clickedHeaderId) ?
                                ({
                                    ...r,
                                    refFormId: refFormData.id,
                                    refFormName: refFormData.originColName
                                }) : r
                        );

                        setCustomizedHeaderList(changedHeader);
                        this.refFormModalClose();
                    }
                }
            },
            storageTitle: function () {
                return {
                    onChangeInputValue: function (e) {
                        e.preventDefault();
                        
                        setCustomizedHeaderList(customizedHeaderList.map(customHeader => {
                            return{
                                ...customHeader,
                                title : e.target.value
                            }
                        }))
                        setStorageTitleName(e.target.value)
                    }
                }
            }
        }
    }


    return (
        <>
            <ModifyCustomizedHeaderBody
                customizedHeaderList={customizedHeaderList}
                
                __handleEventControl={__handleEventControl}
            ></ModifyCustomizedHeaderBody>

            <RefFormSelectModal
                open={refFormSelectModalOpen}
                refFormData={refFormData}
                storageTitleName={storageTitleName}

                __handleEventControl={__handleEventControl}
            ></RefFormSelectModal>
        </>
    )
}

export default withRouter(ModifyCustomizedHeaderMain);