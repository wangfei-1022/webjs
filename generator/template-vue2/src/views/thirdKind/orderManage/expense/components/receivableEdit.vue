<template>
  <div class="order-air-item edit">
    <div class="title">
      <!-- 编辑应收费用确认单 -->
      <span v-if="!!item.id">{{ $t('air.editReceivableExpenseConfirmationDocument') }}</span>
      <!-- 新增应收费用确认单 -->
      <span v-if="!item.id">{{ $t('air.addReceivableExpenseConfirmationDocument') }}</span>
      <span v-if="settlementContractLifeVisible && editForm.partnerRole === 21010" class="textWarm">
        {{ $t('air.settlementCompanyContractLifeWarn') }}
      </span>
      <span v-if="destinationAgentSettlementContractLifeVisible && editForm.partnerRole === 14012" class="textWarm">
        {{ destinationAgentMsgWarn }}
      </span>
    </div>
    <div class="company">
      <el-form ref="editForm" :model="editForm" label-width="95px" label-position="left">
        <el-row>
          <!-- 结算单位类型 -->
          <el-col :span="6">
            <el-form-item :label="$t('air.settlementUnitType')" prop="partnerRole"
              :rules="[{ required: true, message: $t('air.pleaseEnter'), trigger: 'change' },]">
              <el-select v-model="editForm.partnerRole" size="mini" @change="partnerRoleChange"
                :disabled="item.confirmationState === 11">
                <el-option :label="item.label" :value="item.value" v-for="item in partnerRoleOps" :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 结算单位 -->
          <el-col :span="6">
            <el-form-item :label="$t('air.settlementUnit')"
              :rules="[{ required: true, message: $t('receiveFms.can_not_be_null') }]" prop="settlementCompanyName">
              <el-select v-model="editForm.settlementCompanyName" clearable filterable size="mini"
                :disabled="item.confirmationState === 11" @change="customerTitleChange">
                <el-option v-for="item in customerTitleList" :key="item.settlementCompanyId"
                  :label="item.settlementCompanyName" :value="item.settlementCompanyId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 结算方式 -->
          <el-col :span="6">
            <el-form-item :label="$t('air.settlementMethod')" prop="settlementModeName"
              :rules="[{ required: true, message: $t('sea.pleaseEnter'), trigger: 'change' },]">
              <el-select v-model="editForm.settlementModeName" size="mini" :disabled="item.confirmationState === 11"
                @change="settlementModeChange">
                <el-option v-for="item in settlementModeOps" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 收款账套 -->
          <el-col :span="6">
            <el-form-item :label="$t('air.collectionACSet')"
              :rules="[{ required: true, message: $t('receiveFms.can_not_be_null') }]" prop="settlementOfficeId">
              <el-select v-model="editForm.settlementOfficeId" size="mini" :disabled="item.confirmationState === 11">
                <el-option v-for="(item, index) in YHTList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-form ref="chargeForm" :model="chargeForm" label-position="left">
      <el-table size="mini" :border="true" :data="chargeForm.charges" style="width: 100%; " row-key="id">
        <el-table-column prop="feeItemName" :label="$t('receiveFms.charge_name')">
          <template slot-scope="{row, $index}">
            <el-form-item :rules="[{ required: true, message: $t('receiveFms.can_not_be_null') }]"
              :prop="`charges[${$index}].feeItemName`">
              <!-- :method="dmnBusinessApi" -->
              <type-select v-model="row.feeItemName" type="businessFee"
                :requestParams="{ businessTypeCode: orderBusinessType }" @selected="selectedFee($event, $index)"
                :disabled="editStatus(row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="unitName1" :label="$t('receiveFms.unit_name')">
          <template slot-scope="{row, $index}">
            <el-form-item :rules="[{ required: true, message: $t('receiveFms.can_not_be_null') }]"
              :prop="`charges[${$index}].unit1`">
              <el-select v-model="row.unit1" size="mini" :disabled="editStatus(row)">
                <el-option v-for="(item, index) in unitList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="currency" :label="$t('receiveFms.currency')">
          <template slot-scope="{row, $index}">
            <el-form-item :rules="[{ required: true, message: $t('receiveFms.can_not_be_null') }]"
              :prop="`charges[${$index}].currency`">
              <el-select v-model="row.currency" size="mini" @change="calcTotalFn()" :disabled="editStatus(row)">
                <el-option v-for="item in currencyList" :key="item.code" :label="item.code" :value="item.code" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="price" :label="$t('receiveFms.price')">
          <template slot-scope="{row, $index}">
            <el-form-item :rules="[{ required: true, message: $t('receiveFms.can_not_be_null') }]"
              :prop="`charges[${$index}].price`">
              <!-- oninput="value=value.replace(/[^\d.]/g,'')" -->
              <el-input v-model="row.price" size="mini" v-input-limit="[-9, 2]" @change="calcFn($index)"
                :disabled="editStatus(row)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="chargeQuantity1" :label="$t('receiveFms.number')">
          <template slot-scope="{row, $index}">
            <el-form-item :rules="[{ required: true, message: $t('receiveFms.can_not_be_null') }]"
              :prop="`charges[${$index}].chargeQuantity1`">
              <el-input v-model="row.chargeQuantity1" size="mini" oninput="value=value.replace(/[^\d.]/g,'')"
                @change="calcFn($index)" :disabled="editStatus(row)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="soakRate" :label="$t('air.soakRate')">
          <template slot-scope="{row, $index}">
            <el-form-item :prop="`charges[${$index}].extendInfo1`">
              <el-input v-model='row.extendInfo1' size="mini" oninput="value=value.replace(/[^\d.]/g,'')"
                :disabled="editStatus(row)"></el-input>
            </el-form-item>
          </template>
        </el-table-column> -->

        <el-table-column prop="invoiceTaxRate" :label="$t('receiveFms.tax_rate')">
          <template slot-scope="{row, $index}">
            <el-form-item :rules="[{ required: true, message: $t('receiveFms.can_not_be_null') }]"
              :prop="`charges[${$index}].invoiceTaxRate`">
              <el-select v-model="row.invoiceTaxRate" size="mini" @change="calcFn($index)" :disabled="editStatus(row)">
                <el-option v-for="(item, index) in taxRateList" :key="index" :label="item.name" :value="item.code" />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column prop="remark" :label="$t('air.remark')">
          <template slot-scope="{row, $index}">
            <el-form-item :prop="`charges[${$index}].remark`">
              <el-input v-model='row.remark' size="mini" :disabled="editStatus(row)"></el-input>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column prop="taxAmount" :label="$t('receiveFms.tax_amount')">
          <template slot-scope="scope">
            <div class="textAlignR">{{ scope.row.taxAmount | formatNumberToThousandsFilter }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="excludeTaxAmount" :label="$t('receiveFms.exclude_tax_amount')" width="100">
          <template slot-scope="scope">
            <div class="textAlignR">{{ scope.row.excludeTaxAmount | formatNumberToThousandsFilter }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amount" :label="$t('receiveFms.charge_amount')">
          <template slot-scope="scope">
            <div class="textAlignR">{{ scope.row.amount | formatNumberToThousandsFilter }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="oper" :label="$t('receiveFms.operation')" width="60">
          <template slot-scope="{row, $index }">
            <i class="iconfont icon-minus-circle" v-if="chargeForm.charges.length > 1 && !editStatus(row)"
              @click="deleteFn($index)"></i>
            <i class="iconfont icon-add-circle" v-if="$index === 0" @click="addFn($index)"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <span>{{ $t('receiveFms.receive_sum') }}：</span>
        <span>
          <span class="value-item" v-for="(item, index) in sourceAmounts" :key='index'>
            <span class='value'>{{ item.currency }}</span>
            <span>{{ item.value | formatNumberToThousandsFilter }}</span>
          </span>
        </span>
      </div>
    </el-form>

    <div class="company">
      <el-form ref="sendCustomerFrom" :model="sendCustomerFrom" label-width="95px" label-position="left">
        <div style="margin-top: 20px;margin-left: 35px">
          <el-checkbox v-model="sendCustomerFrom.sendEmail" style="margin-bottom: 10px;">
            {{ $t('air.directEmail') }}
          </el-checkbox>
          <el-form-item :label="$t('air.receivingMailbox')" prop="receiveEmails"
            :rules="[{ message: $t('air.pleaseEnter'), trigger: 'change' }, { validator: validateEmail, trigger: 'blur' }]">
            <el-input v-model="sendCustomerFrom.receiveEmails" size="mini" style="width: 500px"
              :placeholder="$t('air.multipleMailboxPartitions')" maxlength="500" show-word-limit></el-input>
          </el-form-item>

          <el-form-item :label="$t('air.mailNotes')" prop="emailRemark" style="margin-top: 10px;">
            <el-input v-model="sendCustomerFrom.emailRemark" size="mini" style="width: 500px" maxlength="200"
              show-word-limit>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div style="text-align: center;margin: 30px 0;">
      <el-button type="primary" size="mini" @click="saveFn">{{ $t('air.save') }}</el-button>
      <el-button type="primary" size="mini" @click="cancelFn">{{ $t('air.cancel') }}</el-button>
    </div>
  </div>
</template>
<script>
import { getDictDataApi } from '@/api/fmsReceiveAir'
import { getOrderBusinessTaxRateApi } from '@/api/thirdKind'
import { airCustomerTitleList } from "@/api/airExport"
import { getTaxRateListApi, getCurrenciesListApi } from '@/api/common'
import { getYHTListApi } from '@/api/partner/base'
import { validEmail } from "@/utils/validate"
import { getUserInfo } from "@/api/login"

export default {
	name: 'ReceivableEdit',
	components: {
	},
	props: {
		type: String,
		item: {
			type: Object,
			default: function () {
				return {}
			}
		},
		index: [String, Number],
		customerId: [String, Number],
		customerName: String,
		confirmationChargesSize: Number,
		etd: [String, Number],
		orderBusinessType: {
			type: String,
			default: ''
		}
	},
	watch: {
		item: {
			handler(val) {
				let target = this.$extends(true, {}, val)

				this.chargeForm.charges = target.charges || []
				if (this.chargeForm.charges.length === 0) {
					this.addFn()
				}
				if (this.type === "ADD") {
					// 去除【客户】默认
					// this.editForm.settlementCompanyId = this.customerId
					// this.editForm.settlementCompanyName = this.customerName
				} else {
					this.editForm.partnerRole = target.partnerRole
					this.editForm.settlementOfficeId = target.settlementOfficeId
					this.editForm.settlementCompanyId = target.settlementCompanyId
					this.sendCustomerFrom.receiveEmails = target.extendInfo2
					this.sendCustomerFrom.emailRemark = target.extendInfo3
				}
				this.sourceAmounts = val.sourceAmounts
				// this.sendCustomerFrom.sendEmail = target.extendInfo1

			},
			immediate: true
		}
	},
	data() {
		return {
			userInfo: {},
			customerTitleList: [],
			partnerRoleOps: [
				{
					"value": 21010,
					"label": this.$t('air.customer')
				}
				// {
				// 	"value": 14012,
				// 	"label": this.$t('air.destinationAgent')
				// }
			],
			settlementContractLifeVisible: false,
			destinationAgentSettlementContractLifeVisible: false,
			destinationAgentMsgWarn: "",
			settlementModeOps: [],
			unitList: [],
			// settlementList: [],
			taxRateList: [],
			currencyList: [],
			YHTList: [],
			sourceAmounts: [],
			editForm: {
				partnerId: '',
				settlementCompanyId: '',
				settlementCompanyName: '',
				settlementOfficeId: '',
				partnerRole: "",
				settlementMode: "",
				settlementModeName: ""
			},
			sendCustomerFrom: {
				sendEmail: "",
				receiveEmails: "",
				emailRemark: ""
			},
			chargeForm: {
				charges: [{}]
			}
		}
	},
	async created() {
		this.userInfo = await getUserInfo()
		this.init()
	},
	methods: {
		init() {
			this.$emit('triggerReceiveLoading', true)
			Promise.all([
				getDictDataApi(8),
				getOrderBusinessTaxRateApi({ businessType: this.orderBusinessType, arAp: 1 }),
				getCurrenciesListApi(),
				getYHTListApi(),
				// getCustomerDropDownListApi(),
				airCustomerTitleList({
					businessTime: this.etd,
					businessType: this.orderBusinessType,
					memberId: this.customerId
				})
			]).then(results => {
				const unitRes = results[0]
				const taxRateRes = results[1]
				const currencyRes = results[2]
				const YHTRes = results[3]
				const customerTitleRes = results[4]
				if (unitRes.ok) {
					let unit = [];
					unitRes.content.forEach(v => {
						if (v.code === 1101 || v.code === 2004 || v.code === 2005) {
							unit.push(v)
						}
					})
					this.unitList = unit
				}
				if (taxRateRes.ok) {
					this.taxRateList = taxRateRes.content
				}
				if (currencyRes.ok) {
					this.currencyList = currencyRes.content
					if (this.type === "ADD") {
						this.chargeForm.charges = [{
							"currency": "CNY",
							"invoiceTaxRate": 4
						}]
					}
				}
				if (YHTRes.ok) {
					this.YHTList = YHTRes.content
					if (this.type === "ADD") {
						this.editForm.settlementOfficeId = "1"
						this.editForm.partnerRole = 21010
						this.sendCustomerFrom.receiveEmails = this.userInfo.email // 默认当前用户邮箱
					}
				}
				if (customerTitleRes.ok) {
					this.customerTitleList = []
					if (customerTitleRes.content) {
						this.customerTitleList = customerTitleRes.content
					}
					if (this.customerTitleList.length === 0 && this.editForm.partnerRole === 21010) {
						this.settlementContractLifeVisible = true
						this.$message.warning(this.$t('air.settlementCompanyContractLifeWarn'));
					} else {
						this.settlementContractLifeVisible = false
					}
					// 结算单位，结算方式下拉检查
					this.customerTitleChange(this.editForm.settlementCompanyId)
				}
				this.$emit('triggerReceiveLoading')
			})
		},
		editStatus(charge) {
			if (this.type === "EDIT" && this.item.confirmationState === 11) {
				// 可编辑 账单状态为：调整中
				if (charge.entryState === 11 || !charge.entryState) {
					return false
				}
				return true
			}
			return false
		},
		// 结算单位类型
		partnerRoleChange(item) {
			// console.log(item)
			this.editForm.settlementCompanyId = ""
			this.editForm.settlementCompanyName = ""
			this.editForm.settlementMode = ""
			this.editForm.settlementModeName = ""
			this.settlementModeOps = []
			// if (item == 21010) {
			if (this.customerTitleList.length === 0 && item === 21010) {
				this.settlementContractLifeVisible = true
				this.$message.warning(this.$t('air.settlementCompanyContractLifeWarn'));
			} else {
				this.settlementContractLifeVisible = false
			}
			if (this.customerTitleList.length > 0 && this.editForm.partnerRole === 21010) {
				this.settlementModeOps = [{
					code: this.customerTitleList[0].rechargeMode,
					name: this.customerTitleList[0].rechargeModeName
				}]
			}
		},
		customerTitleChange(item) {
			this.editForm.settlementCompanyId = item
			this.settlementModeOps = [];
			this.editForm.settlementMode = ""
			this.editForm.settlementModeName = ""
			if (item) {
				let customerTitle = this.customerTitleList.find(res => item === res.settlementCompanyId)
				this.editForm.settlementCompanyName = customerTitle.settlementCompanyName
				this.editForm.settlementMode = customerTitle.rechargeMode
				this.editForm.settlementModeName = customerTitle.rechargeModeName
				this.settlementModeOps = [
					{
						code: customerTitle.rechargeMode,
						name: customerTitle.rechargeModeName
					}
				]
			}
		},
		settlementModeChange(item) {
			this.editForm.settlementMode = item
		},
		calcTotalFn() {
			this.$nextTick(() => {
				let map = {}
				let arr = []
				this.chargeForm.charges.forEach(v => {
					if (v.currency && v.amount) {
						map[v.currency] = (Number(map[v.currency] || 0) + Number(v.amount)).toFixed(2)
					}
				})
				Object.keys(map).forEach(v => {
					arr.push({
						currency: v,
						value: map[v]
					})
				})
				this.sourceAmounts = arr
			})
		},
		calcFn(index) {
			let item = this.chargeForm.charges[index]
			if (item.price && item.chargeQuantity1 && item.invoiceTaxRate) {
				let all = item.amount = (item.price * item.chargeQuantity1).toFixed(2)
				item.excludeTaxAmount = (all / (1 + Number(this.taxRateList.find(res => res.code === item.invoiceTaxRate).rateValue) * 0.01)).toFixed(2)
				item.taxAmount = (all * 100 - item.excludeTaxAmount * 100) / 100
			} else {
				item.amount = ''
				item.excludeTaxAmount = ''
				item.taxAmount = ''
			}
			this.$set(this.chargeForm.charges, index, item)
			this.calcTotalFn()
		},
		selectedFee(charge, index) {
			let item = this.chargeForm.charges[index]
			item.feeItemName = charge.chineseName
			item.feeItemCode = charge.code
			this.$set(this.chargeForm.charges, index, item)
		},
		deleteFn(index) {
			this.chargeForm.charges.splice(index, 1)
		},
		addFn() {
			let invoiceTaxRate = this.taxRateList.length === 1 ? this.taxRateList[0].code : null
			this.chargeForm.charges.unshift({
				"currency": "CNY",
				"invoiceTaxRate": invoiceTaxRate
			})
		},
		saveFn() {
			let vb = false; let ve = false; let vc = false
			this.$refs.chargeForm.validate(valid => {
				vb = valid
			})
			this.$refs.editForm.validate(valid => {
				ve = valid
			})
			this.$refs.sendCustomerFrom.validate(valid => {
				vc = valid
			})
			if (ve && vb && vc) {
				this.chargeForm.charges.forEach(v => {
					v.stepSize1 = 1
					v.price = Number(v.price).toFixed(2)
					// 删除该属性 后端会重新计算
					// 接口的通用性 场景的复用性
					delete v.amount
				})
				if (this.sendCustomerFrom.sendEmail) {
					if (!this.sendCustomerFrom.receiveEmails) {
						this.$message.error(this.$t('air.requireReceiveEmails'));
						return;
					}
				}

				this.editForm.partnerId = this.editForm.settlementCompanyId
				this.$emit('saveFn', this.index, {
					...this.item,
					...this.editForm,
					...this.chargeForm,
					extendInfo1: this.sendCustomerFrom.sendEmail,
					extendInfo2: this.sendCustomerFrom.receiveEmails,
					extendInfo3: this.sendCustomerFrom.emailRemark ? this.sendCustomerFrom.emailRemark : ""
				}, this.type)
			}
		},
		cancelFn() {
			this.$emit('cancelFn', this.index, this.type)
		},
		// 发送短信
		validateEmail(rule, value, callback) {
			if (value) {
				let emailArr = value.split(';')
				let isSome = emailArr.some(item => {
					if (!validEmail(item)) {
						callback(new Error(item + this.$t('blInfo.emailError')))
						return true
					}
				})
				if (!isSome) {
					callback()
				}
			} else {
				callback()
			}
		}
	}
}
</script>

<style scoped lang="scss">
.charge-tab {
	background: #fff;
	padding: 20px;
}

.order-air-item {
	border: 1px solid #dcdfe6;
	box-shadow: 0 2px 4px 0 #eee, 0 0 6px 0 #eee;
	margin-bottom: 20px;

	::v-deep .el-form-item {
		margin-bottom: 0;
	}

	.title {
		font-weight: 600;
		line-height: 60px;
		padding: 0 20px;
		border-bottom: 1px solid #ccc;
	}

	.link {
		font-weight: 500;
		color: #1890ff;
	}

	.company {
		padding: 12px 20px;
		overflow: hidden;

		label {
			font-weight: 500;
			margin-right: 20px;
		}
	}
}

.add {
	padding: 10px;
	text-align: center;
	border: 1px dashed blue;
	box-shadow: 0 2px 4px 0 #eee, 0 0 6px 0 #eee;
}

.textAlignR {
	text-align: right;
}

.textWarm {
	font-size: small;
	margin-left: 70px;
	color: red;
}

.total {
	background: rgba(16, 142, 233, 0.1);
	color: #108ee9;
	font-family: "PingFangSC-Regular", "PingFang SC";
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	height: 40px;
	line-height: 40px;
	padding: 0px 10px;

	.value-item {
		display: inline-block;
		margin-right: 30px;

		.value {
			display: inline-block;
			margin-right: 5px;
		}
	}
}
</style>
