<template>
  <div>
    <el-header>
      <el-row type="flex" align="middle">
        <el-col :span="4">
          <el-page-header @back="$router.back()" content="Maintenance data"></el-page-header>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="submitForm">Save</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="main">
      <div v-if="invoice" class="title">
        <div class="license-plate">
          <b>License plate:</b>
          <div class="license-plate">{{invoice.maintenance.vehicle.license_plate}}</div>
        </div>
        <b>{{invoice.maintenance.vehicle.user.email}}</b>
        on
        <b>{{formatDate(invoice.created)}}</b>
        <el-divider direction="vertical"></el-divider>
        <el-button @click="downloadFile(invoice)" type="text">Download invoice</el-button>
        <p class="invoice-filename">({{invoice.file_name}})</p>
      </div>
    </el-main>
    <el-form class="form" ref="invoiceForm" :model="invoice" label-width="120px" v-if="invoice">
      <el-col :span="6">
        <el-form-item label="Odometer">
          <el-input-number v-model="invoice.maintenance.odometer"></el-input-number>
        </el-form-item>

        <el-form-item label="Odometer unit">
          <el-select v-model="invoice.maintenance.odometer_unit" placeholder="Select">
            <el-option
              v-for="item in odometerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Status">
          <el-select v-model="invoice.status" placeholder="Status">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-col :span="19">
          <el-form-item label="Note">
            <el-input
              type="textarea"
              autosize
              placeholder="Anything that needs to be noted?"
              v-model="invoice.maintenance.note"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Date">
            <el-date-picker
              v-model="invoice.maintenance.date"
              type="date"
              placeholder="Date of invoice"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-col>

      <el-col :span="4">
        <h5 class="maintenance-lines-header">Maintenance lines</h5>
        <MaintenanceLine
          v-for="maintenanceLine in maintenanceLines"
          :key="maintenanceLine.id"
          :maintenance-line="maintenanceLine"
          :categories="categories"
          @remove="removeMaintenanceLine"
        />
        <el-button @click="addMaintenanceLine">Add maintenance line</el-button>
      </el-col>
    </el-form>
  </div>
</template>

<script lang="ts" src="./index.ts" />

<style lang="scss" scoped>
.main {
  padding-top: 0;
  padding-bottom: 0;
}
.title {
  margin-top: 16px;
}
.license-plate {
  & {
    font-size: 24px;
  }
}

.form {
  margin-top: 32px;
}
.maintenance-lines-header {
  margin-top: 0;
}
.invoice-filename {
  font-size: 12px;
  display: inline-block;
  color: #666;
}
</style>

