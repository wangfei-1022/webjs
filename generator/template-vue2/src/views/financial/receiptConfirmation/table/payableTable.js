export default {
  defaultFlag: true,
  moduleName: '应付费用确认单',
  moduleCode: 'PAYABLE_CONFIRMATION_PAGE',
  schemeName: '默认表头',
  schemeContent: [{
    field: 'index',
    headerNameKey: '',
    width: 55,
    pinned: 'left',
    suppressSorting: true,
    checkboxSelection: true,
    suppressMenu: true,
    suppressSizeToFit: true,
    suppressResize: true,
    headerCheckboxSelection: true
  }, {
    field: "confirmationNo",
    headerNameKey: "payableFms.serial_no",
    width: 150
  }, {
    field: "entityNo",
    headerNameKey: "payableFms.entity_no",
    width: 150
  }, {
    field: "entityTypeName",
    headerNameKey: "payableFms.entityTypeName",
    width: 150
  }, {
    field: "extendInfo11",
    headerNameKey: "payableFms.business_no",
    width: 150
  }, {
    field: "businessTypeName",
    headerNameKey: "payableFms.business_type",
    width: 100
  }, {
    field: "settlementCompanyName",
    headerNameKey: "payableFms.settlement_company_name",
    width: 130
  }, {
    field: "USD",
    headerNameKey: "common.USD",
    width: 100,
    type: 'numericColumn'
  },
  {
    field: "CNY",
    headerNameKey: "common.CNY",
    width: 100,
    type: 'numericColumn'
  },
  {
    field: "EUR",
    headerNameKey: "common.EUR",
    width: 100,
    type: 'numericColumn'
  },
  {
    field: "GBP",
    headerNameKey: "common.GBP",
    width: 100,
    type: 'numericColumn'
  },
  {
    field: "HKD",
    headerNameKey: "common.HKD",
    width: 100,
    type: 'numericColumn'
  }, {
    field: "settlementOfficeName",
    headerNameKey: "payableFms.settlement_office_name",
    width: 130
  }, {
    field: "responsiblePersonName",
    headerNameKey: "payableFms.product_names",
    width: 100
  }, {
    field: "confirmByName",
    headerNameKey: "payableFms.submit_name",
    width: 100
  }, {
    field: "confirmTime",
    headerNameKey: "payableFms.submit_time",
    width: 150
  }, {
    field: "bussinessDate",
    headerNameKey: "payableFms.business_date",
    width: 150
  }, {
    field: "entryStateName",
    headerNameKey: "payableFms.bill_status",
    width: 100
  },
  {
    field: "instructionStateName",
    headerNameKey: "payableFms.apply_clear_status",
    width: 120,
    hide: false,
    resizable: true
  },
  {
    field: "clearStateName",
    headerNameKey: "payableFms.verification_status",
    width: 90
  }, {
    field: "confirmationStateName",
    headerNameKey: "payableFms.confirmation_state",
    width: 130
  }, {
    field: "JPY",
    headerNameKey: "common.JPY",
    width: 100,
    type: 'numericColumn',
    hide: true
  },
  {
    field: "AUD",
    headerNameKey: "common.AUD",
    width: 100,
    type: 'numericColumn',
    hide: true
  },
  {
    field: "BRL",
    headerNameKey: "common.BRL",
    width: 100,
    type: 'numericColumn',
    hide: true
  },
  {
    field: "MAN",
    headerNameKey: "common.MAN",
    width: 100,
    type: 'numericColumn',
    hide: true
  },
  {
    field: "VND",
    headerNameKey: "common.VND",
    width: 100,
    type: 'numericColumn',
    hide: true
  }, {
    field: "profitStateName",
    headerNameKey: "receiveFms.profit_state",
    width: 100
  }, {
    field: "optionBtn",
    headerNameKey: "payableFms.operation",
    cellRendererFramework: "OptionBtnConfirmation",
    pinned: 'right',
    width: 130
  }]
}

