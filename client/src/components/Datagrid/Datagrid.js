import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import FilterListIcon from '@material-ui/icons/FilterList'

import { Button } from '@material-ui/core'
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { flattenObject } from '../../utils/utils'

import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'

import { haveAccess, userPermission } from '../../variables/user.js'
const { ADMIN, COLLABORATOR, SELLER, DISPATCHER, GUESS } = userPermission
// import { Draggable } from 'react-data-grid-addons'
// const DraggableContainer = Draggable.Container

const { REACT_APP_API_URL } = process.env
const token = localStorage.getItem('jwt')

const PhoneFormatters = ({ row }) => {
	let phoneNumber = ''
	if (row.phone.phone) {
		phoneNumber = row.phone.phone
		if (row.phone.ext) {
			phoneNumber += `, poste ${row.phone.ext}`
		}
	} else if (row.phone.mobile) {
		phoneNumber = row.phone.mobile
	}

	return phoneNumber
}

function DataGrid() {
	const [customers, setCustomers] = useState([])
	const [first, setFirst] = useState(0)
	const [selectedStatus, setSelectedStatus] = useState(null)
	const [selectedData, setSelectedData] = useState(null)
	const [customer, setCustomer] = useState(null)
	const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false)
	const [toggleFilter, setToggleFilter] = useState(null)
	const [filter, setFilter] = useState({ archive: false, noActivity: false, noSubmission: false, noContact: false })

	const deleteCustomer = async () => {
		const controller = new AbortController()
		const { signal } = controller

		const res = await fetch(`${REACT_APP_API_URL}/api/customer/${customer._id}/`, {
			method: 'DELETE',
			...signal,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
		const data = await res.json()

		if (data.success) {
			let _customers = customers.filter(val => val._id !== customer._id)
			setDeleteCustomerDialog(false)
			setCustomer(null)
			setCustomers(_customers)
			toast.current.show({ severity: 'success', summary: 'Réussi', detail: data.message, life: 6000 })
		} else {
			toast.current.show({ severity: 'error', summary: 'Échec', detail: data.message, life: 3000 })
		}
	}

	const archiveCustomer = async () => {
		const controller = new AbortController()
		const { signal } = controller

		const postData = {
			archive: true
		}

		const res = await fetch(`${REACT_APP_API_URL}/api/customer/${customer._id}`, {
			method: 'PATCH',
			body: JSON.stringify(postData),
			...signal,
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
		const data = await res.json()

		if (data.success) {
			let _customers = customers.filter(val => val._id !== customer._id)
			setCustomers(_customers)

			setDeleteCustomerDialog(false)
			setCustomer(null)
			toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Client archivé', life: 3000 })
		} else {
			toast.current.show({ severity: 'error', summary: 'Échec', detail: data.message, life: 3000 })
		}
	}

	const hideDeleteCustomerDialog = () => {
		setDeleteCustomerDialog(false)
	}

	const confirmDeleteCustomer = customer => {
		setCustomer(customer)
		setDeleteCustomerDialog(true)
	}

	const deleteCustomerDialogFooter = (
		<React.Fragment>
			<Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCustomerDialog}>
				Non
			</Button>
			<Button
				label="Yes"
				icon="pi pi-check"
				className="p-button-text"
				onClick={deleteCustomer}
				style={{ color: 'red' }}
			>
				Supprimer
			</Button>
			<Button
				label="Yes"
				icon="pi pi-check"
				className="p-button-text"
				onClick={archiveCustomer}
				style={{ color: 'orange' }}
			>
				Archiver
			</Button>
		</React.Fragment>
	)

	const dt = useRef(null)
	const toast = useRef(null)

	const statuses = ['Prospect', 'Partenaire', 'Revendeur', 'Fournisseur', 'Transporteur', 'Autre']

	const exportCSV = selectionOnly => {
		dt.current.exportCSV({ selectionOnly })
	}

	const exportExcel = selectionOnly => {
		import('xlsx').then(xlsx => {
			const formatedData = selectedData.map(item => {
				if (item['postedBy']) delete item['postedBy']._id
				return flattenObject(item)
			})

			if (formatedData) {
				const worksheet = xlsx.utils.json_to_sheet(formatedData)
				const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] }
				const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' })
				saveAsExcelFile(excelBuffer, 'customers')
			}
		})
	}

	const saveAsExcelFile = (buffer, fileName) => {
		import('file-saver').then(FileSaver => {
			let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
			let EXCEL_EXTENSION = '.xlsx'
			const data = new Blob([buffer], {
				type: EXCEL_TYPE
			})
			FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION)
		})
	}

	const onStatusChange = e => {
		dt.current.filter(e.value, 'status', 'equals')
		setSelectedStatus(e.value)
	}

	const statusBodyTemplate = rowData => {
		return (
			<React.Fragment>
				{/* <span className="p-column-title">Status</span> */}
				<span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>
			</React.Fragment>
		)
	}

	const statusItemTemplate = option => {
		return <span className={`customer-badge status-${option}`}>{option}</span>
	}

	const actionBodyTemplate = rowData => {
		return (
			<>
				<Link to={`/admin/customers/${rowData._id}`}>
					<Button className="p-button-rounded p-button-success p-mr-2">
						<PermIdentityIcon />
					</Button>
				</Link>
				{haveAccess([ADMIN, COLLABORATOR]) && (
					<Button
						className="p-button-rounded p-button-warning"
						onClick={() => confirmDeleteCustomer(rowData)}
					>
						<DeleteSweepIcon />
					</Button>
				)}
			</>
		)
	}

	const statusFilter = (
		<Dropdown
			value={selectedStatus}
			options={statuses}
			onChange={onStatusChange}
			itemTemplate={statusItemTemplate}
			placeholder="Choisir un type"
			className="p-column-filter"
			showClear
		/>
	)

	const rightToolbarTemplate = () => {
		return (
			<React.Fragment>
				{/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" /> */}
				<Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
			</React.Fragment>
		)
	}

	const defaultTableProperty = {
		reorderableColumns: true,
		sortMode: 'multiple',
		scrollable: true,
		resizableColumns: true,
		columnResizeMode: 'expand'
	}

	const defaultColumnProperty = {
		sortable: true,
		filter: true,
		exportable: true,
		reorderable: true,
		headerStyle: { minWidth: '160px' }
	}

	const defaultColumns = [
		{
			field: 'refNumber',
			header: 'REF'
		},
		{
			field: 'name',
			header: 'Companie'
		},
		{
			field: 'phone.phone',
			header: 'Téléphone'
		},
		{
			field: 'status',
			header: 'Type'
		},
		{
			field: 'options',
			header: 'Options',
			filter: false,
			sortable: false,
			body: actionBodyTemplate
		}
	].map(column => ({ ...defaultColumnProperty, ...column }))

	useEffect(() => {
		const controller = new AbortController()
		const { signal } = controller

		fetch(`${REACT_APP_API_URL}/api/customer?archive=0`, {
			...signal,
			headers: { Authorization: `Bearer ${token}` }
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					setCustomers(data.data)
					setSelectedData(data.data)
				}
			})

		return () => controller.abort()
	}, [])

	useEffect(() => {
		if (toggleFilter != null) {
			const controller = new AbortController()
			const { signal } = controller

			const esc = encodeURIComponent
			const query = Object.keys(filter)
				.map(k => esc(k) + '=' + esc(filter[k]))
				.join('&')
			console.log(filter)

			fetch(`${REACT_APP_API_URL}/api/customer?${query}`, {
				...signal,
				headers: { Authorization: `Bearer ${token}` }
			})
				.then(res => res.json())
				.then(data => {
					if (data.success) {
						setCustomers(data.data)
						setSelectedData(data.data)
					}
				})
			return () => controller.abort()
		}
	}, [toggleFilter, filter])

	/* Filters */
	const handleToggleFilter = () => {
		setToggleFilter(prev => {
			if (prev) {
				console.log('supprime les filtres')

				setFilter({ archive: false, noActivity: false, noSubmission: false, noContact: false })
			}
			return !prev
		})
	}

	const handleFilterCheckbox = e => {
		setFilter({ ...filter, [e.target.name]: e.target.checked })
	}

	return (
		<>
			<Toast ref={toast} />
			<Button
				type="button"
				icon="pi pi-file-excel"
				onClick={handleToggleFilter}
				className="p-button-success p-mr-2"
				data-pr-tooltip="XLS"
			>
				<FilterListIcon /> {toggleFilter ? 'Aucun filtre' : 'Filtre supplémentaire'}
			</Button>

			{toggleFilter && (
				<div className="filter-content">
					<FormControl style={{ width: '100%' }} className="form-group">
						<FormControlLabel
							control={
								<Checkbox
									checked={filter.noACtivity}
									onChange={e => {
										handleFilterCheckbox(e)
									}}
									name="noActivity"
								/>
							}
							label="Client sans activité"
						/>
					</FormControl>
					<FormControl style={{ width: '100%' }} className="form-group">
						<FormControlLabel
							control={
								<Checkbox
									checked={filter.noSubmission}
									onChange={e => {
										handleFilterCheckbox(e)
									}}
									name="noSubmission"
								/>
							}
							label="Client sans soumission"
						/>
					</FormControl>

					<FormControl style={{ width: '100%' }} className="form-group">
						<FormControlLabel
							control={
								<Checkbox
									checked={filter.noContact}
									onChange={e => {
										handleFilterCheckbox(e)
									}}
									name="noContact"
								/>
							}
							label="Client sans contact"
						/>
					</FormControl>
					<FormControl style={{ width: '100%' }} className="form-group">
						<FormControlLabel
							control={
								<Checkbox
									checked={filter.archive}
									onChange={e => {
										handleFilterCheckbox(e)
									}}
									name="archive"
								/>
							}
							label="Clients archivés"
						/>
					</FormControl>
				</div>
			)}
			{haveAccess([ADMIN, COLLABORATOR, SELLER, DISPATCHER]) && (
				<div>
					<span>Exporter les {selectedData?.length} résultats filtrés en </span>
					<Button
						type="button"
						icon="pi pi-file-o"
						onClick={() => exportCSV(false)}
						className="p-mr-2"
						data-pr-tooltip="CSV"
					>
						csv
					</Button>
					<span> ou </span>
					<Button
						type="button"
						icon="pi pi-file-excel"
						onClick={exportExcel}
						className="p-button-success p-mr-2"
						data-pr-tooltip="XLS"
					>
						excel
					</Button>
				</div>
			)}

			<DataTable
				ref={dt}
				value={customers}
				paginator
				paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink LastPageLink"
				rows={20}
				first={first}
				onPage={e => setFirst(e.first)}
				onValueChange={filteredData => setSelectedData(filteredData)}
				{...defaultTableProperty}
			>
				{defaultColumns.map(column => {
					if (column.field === 'status') {
						return (
							<Column
								key={column.field}
								{...column}
								body={statusBodyTemplate}
								filter
								filterElement={statusFilter}
							></Column>
						)
					}
					return <Column key={column.field} {...column}></Column>
				})}
			</DataTable>
			<Dialog
				visible={deleteCustomerDialog}
				style={{ width: '450px' }}
				header="Confirm"
				modal
				footer={deleteCustomerDialogFooter}
				onHide={hideDeleteCustomerDialog}
			>
				<div className="confirmation-content">
					<i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
					{customer && (
						<span>
							Désirez vous supprimer ou archivé ce client : <b>{customer.name}</b>? <br />
							<b>La suppression</b> entrainera la suppression de toutes les activités, les contacts,
							notes, soumissions et documents associés à celui-ci. Tandis que <b>l'archive</b> désactivera
							l'entreprise, mais conservera toutes ses informations.
						</span>
					)}
				</div>
			</Dialog>
		</>
	)
}

export default DataGrid
