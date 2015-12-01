import React from 'react';
import RCTable from './rc-table';
import reqwest from 'reqwest';
import Pagination from '../pagination/index';
// import Spin from '../spin/index';
// import Icon from '../iconfont/index';
// import Checkbox from '../checkbox/index';
import {Spin, Icon, Checkbox} from '../../index';

require('./bh-table.scss');

function noop() {}

function defaultResolve(data) {
    return data || [];
}

class DataSource {
    init(config) {
        this.config = config;
        this.url = config.url || '';
        this.resolve = config.resolve || defaultResolve;
        this.getParams = config.getParams || noop;
        this.getPagination = config.getPagination || noop;
        this.headers = config.headers || {};
        this.data = config.data || {};
    }
    constructor(config) {
        if (config) {
            this.init(config);
        }
    }
    clone(config = {}) {
        return new DataSource(Object.assign({}, this.config, config));
    }
}

let Table = React.createClass({
    getInitialState: function() {
        return {
            selectedRowKeys: [],
            data: [],
            dataSource: this.props.dataSource,
            selectionDirty: false,
            loading: this.props.loading,
            sortColumn: '',
            sortOrder: '',
            sorter: null,
            radioIndex: null,
            pagination: this.hasPagination() ? Object.assign({
                pageSize: 10,
                current: 1
            }, this.props.pagination) : {}
        };
    },

    getDefaultProps: function() {
        return {
            prefixCls: 'bhr-table',
            useFixedHeader: false,
            rowSelection: null,
            className: '',
            size: 'default',
            loading: false,
            bordered: false,
            columns: [],
            onChange: function() {}
        };
    },

    getDefaultSelection: function() {
        let selectedRowKeys = [];
        if (this.props.rowSelection && this.props.rowSelection.getCheckboxProps) {
            let data = this.getCurrentPageData();
            data.filter((item) => {
                if (this.props.rowSelection.getCheckboxProps) {
                    return this.props.rowSelection.getCheckboxProps(item).defaultChecked;
                }
                return true;
            }).map((record, rowIndex) => {
                selectedRowKeys.push(this.getRecordKey(record, rowIndex));
            });
        }
        return selectedRowKeys;
    },

    componentWillReceiveProps: function(nextProps) {
        if (('pagination' in nextProps) && nextProps.pagination !== false) {
            this.setState({
                pagination: Object.assign({}, this.state.pagination, nextProps.pagination)
            });
        }
        // 外界只有 dataSource 的变化会触发新请求
        if ('dataSource' in nextProps &&
            nextProps.dataSource !== this.props.dataSource) {
            let selectedRowKeys = this.state.selectedRowKeys;
            // 把不在当前页的选中项去掉
            if (this.isLocalDataSource()) {
                let currentPageRowKeys = this.getLocalDataPaging(nextProps.dataSource);
                selectedRowKeys = selectedRowKeys.filter((key) => {
                    return currentPageRowKeys.indexOf(key) >= 0;
                });
            }
            this.setState({
                selectionDirty: false,
                dataSource: nextProps.dataSource,
                loading: true
            }, this.fetch);
        }
        if ('loading' in nextProps) {
            this.setState({
                loading: nextProps.loading
            });
        }
    },

    hasPagination: function(pagination) {
        if (pagination === undefined) {
            pagination = this.props.pagination;
        }
        return pagination !== false;
    },

    isLocalDataSource: function() {
        return Array.isArray(this.state.dataSource);
    },

    getRemoteDataSource: function() {
        return this.state.dataSource;
    },

    toggleSortOrder: function(order, column) {
        let sortColumn = this.state.sortColumn;
        let sortOrder = this.state.sortOrder;
        let sorter;
        // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
        let isSortColumn = this.isSortColumn(column);
        if (!isSortColumn) { // 当前列未排序
            sortOrder = order;
            sortColumn = column;
        } else { // 当前列已排序
            if (sortOrder === order) { // 切换为未排序状态
                sortOrder = '';
                sortColumn = null;
            } else { // 切换为排序状态
                sortOrder = order;
            }
        }
        if (this.isLocalDataSource()) {
            sorter = function() {
                let result = column.sorter.apply(this, arguments);
                if (sortOrder === 'ascend') {
                    return result;
                } else if (sortOrder === 'descend') {
                    return -result;
                }
            };
        }
        const newState = {
            sortOrder,
            sortColumn,
            sorter
        };
        this.fetch(newState);
        this.props.onChange.apply(this, this.prepareParamsArguments(Object.assign({}, this.state, newState)));
    },

    handleSelect: function(record, rowIndex, e) {
        let checked = e.target.checked;
        let defaultSelection = [];
        if (!this.state.selectionDirty) {
            defaultSelection = this.getDefaultSelection();
        }
        let selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
        let key = this.getRecordKey(record, rowIndex);
        if (checked) {
            selectedRowKeys.push(this.getRecordKey(record, rowIndex));
        } else {
            selectedRowKeys = selectedRowKeys.filter((i) => {
                return key !== i;
            });
        }
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectionDirty: true
        });
        if (this.props.rowSelection.onSelect) {
            let data = this.getCurrentPageData();
            let selectedRows = data.filter((row, i) => {
                return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
            });
            this.props.rowSelection.onSelect(record, checked, selectedRows);
        }
    },

    handleSelectAllRow: function(e) {
        let checked = e.target.checked;
        let data = this.getCurrentPageData();
        let selectedRowKeys = checked ? data.filter((item) => {
            if (this.props.rowSelection.getCheckboxProps) {
                return !this.props.rowSelection.getCheckboxProps(item).disabled;
            }
            return true;
        }).map((item, i) => {
            return this.getRecordKey(item, i);
        }) : [];
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectionDirty: true
        });
        if (this.props.rowSelection.onSelectAll) {
            let selectedRows = data.filter((row, i) => {
                return selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0;
            });
            this.props.rowSelection.onSelectAll(checked, selectedRows);
        }
    },

    handlePageChange: function(current) {
        let pagination = Object.assign({}, this.state.pagination);
        if (current) {
            pagination.current = current;
        } else {
            pagination.current = pagination.current || 1;
        }
        const newState = {
            // 防止内存泄漏，只维持当页
            selectedRowKeys: [],
            selectionDirty: false,
            pagination
        };
        this.fetch(newState);
        this.props.onChange.apply(this, this.prepareParamsArguments(Object.assign({}, this.state, newState)));
    },

    renderSelectionCheckBox: function(value, record, index) {
        let rowIndex = this.getRecordKey(record, index); // 从 1 开始
        let checked;
        if (this.state.selectionDirty) {
            checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
        } else {
            checked = (this.state.selectedRowKeys.indexOf(rowIndex) >= 0 ||
                this.getDefaultSelection().indexOf(rowIndex) >= 0);
        }
        let props = {};
        if (this.props.rowSelection.getCheckboxProps) {
            props = this.props.rowSelection.getCheckboxProps.call(this, record);
        }
        return <Checkbox checked={checked} disabled={props.disabled}
                     onChange={this.handleSelect.bind(this, record, rowIndex)}/>;
    },

    getRecordKey: function(record, index) {
        return record.key || index;
    },

    renderRowSelection: function() {
        let columns = this.props.columns.concat();
        if (this.props.rowSelection) {
            let data = this.getCurrentPageData();
            let checked;
            if (!data.length) {
                checked = false;
            } else {
                checked = data.filter((item) => {
                    if (this.props.rowSelection.getCheckboxProps) {
                        return !this.props.rowSelection.getCheckboxProps(item).disabled;
                    }
                    return true;
                }).every((item, i) => {
                    let key = this.getRecordKey(item, i);
                    return this.state.selectedRowKeys.indexOf(key) >= 0;
                });
            }
            let selectionColumn;
            let checkboxAll = <Checkbox checked={checked} onChange={this.handleSelectAllRow}/>;
            selectionColumn = {
                key: 'selection-column',
                title: checkboxAll,
                width: 60,
                render: this.renderSelectionCheckBox,
                className: 'bhr-table-selection-column'
            };
            if (columns[0] &&
                columns[0].key === 'selection-column') {
                columns[0] = selectionColumn;
            } else {
                columns.unshift(selectionColumn);
            }
        }
        return columns;
    },

    getCurrentPageData: function() {
        return this.isLocalDataSource() ? this.getLocalDataPaging() : this.state.data;
    },

    getColumnKey: function(column, index) {
        return column.key || column.dataIndex || index;
    },

    isSortColumn: function(column) {
        if (!column || !this.state.sortColumn) {
            return false;
        }
        let colKey = this.getColumnKey(column);
        let isSortColumn = (this.getColumnKey(this.state.sortColumn) === colKey);
        return isSortColumn;
    },

    renderColumnsDropdown: function(columns) {
        return columns.map((column, i) => {
            column = Object.assign({}, column);
            let key = this.getColumnKey(column, i);
            let sortButton;

            if (column.sorter) {
                let isSortColumn = this.isSortColumn(column);
                if (isSortColumn) {
                    column.className = column.className || '';
                    if (this.state.sortOrder) {
                        column.className += ' bhr-table-column-sort';
                    }
                }
                sortButton = <div className="bhr-table-column-sorter">
                    <span className={'bhr-table-column-sorter-up ' +
                               ((isSortColumn && this.state.sortOrder === 'ascend') ? 'on' : 'off')}
                        title="升序排序"
                        onClick={this.toggleSortOrder.bind(this, 'ascend', column)}>
                        <Icon type="caret-up"/>
                    </span>
                    <span className={'bhr-table-column-sorter-down ' +
                               ((isSortColumn && this.state.sortOrder === 'descend') ? 'on' : 'off')}
                        title="降序排序"
                        onClick={this.toggleSortOrder.bind(this, 'descend', column)}>
                        <Icon type="caret-down"/>
                    </span>
                </div>;
            }
            column.title = <div>
                {column.title}
                {sortButton}
            </div>;
            return column;
        });
    },

    handleShowSizeChange: function(current, pageSize) {
        let pagination = Object.assign(this.state.pagination, {
            pageSize: pageSize
        });
        this.fetch({
            pagination
        });
    },

    renderPagination: function() {
        // 强制不需要分页
        if (!this.hasPagination()) {
            return null;
        }
        let classString = 'bhr-table-pagination';
        if (this.props.size === 'small') {
            classString += ' mini';
        }
        let total = this.state.pagination.total;
        if (!total && this.isLocalDataSource()) {
            total = this.getLocalData().length;
        }
        return (total > 0) ? <Pagination className={classString}
                                         onChange={this.handlePageChange}
                                         total={total}
                                         pageSize={10}
                                         onShowSizeChange={this.handleShowSizeChange}
            {...this.state.pagination} /> : null;
    },

    prepareParamsArguments: function(state) {
        // 准备排序、分页的参数
        let pagination;
        let sorter = {};
        pagination = state.pagination;

        if (state.sortColumn &&
            state.sortOrder &&
            state.sortColumn.dataIndex) {
            sorter.field = state.sortColumn.dataIndex;
            sorter.order = state.sortOrder;
        }
        return [pagination, sorter];
    },

    fetch: function(newState) {
        if (this.isLocalDataSource()) {
            if (newState) {
                this.setState(newState);
            }
        } else {
            // remote 模式使用 this.dataSource
            let dataSource = this.getRemoteDataSource();
            if (!dataSource) {
                return null;
            }
            let state = Object.assign({}, this.state, newState);
            if (newState || !this.state.loading) {
                this.setState(Object.assign({
                    loading: true
                }, newState));
            }
            let buildInParams = dataSource.getParams.apply(this, this.prepareParamsArguments(state)) || {};
            return reqwest({
                url: dataSource.url,
                method: 'get',
                data: Object.assign(buildInParams, dataSource.data),
                headers: dataSource.headers,
                type: 'json',
                success: (result) => {
                    if (this.isMounted()) {
                        let pagination = Object.assign(
                            state.pagination,
                            dataSource.getPagination.call(this, result)
                        );
                        this.setState({
                            selectionDirty: false,
                            loading: false,
                            data: dataSource.resolve.call(this, result),
                            pagination: pagination
                        });
                    }
                },
                error: () => {
                    this.setState({
                        loading: false,
                        data: []
                    });
                }
            });
        }
    },

    findColumn: function(myKey) {
        return this.props.columns.filter((c) => {
            return this.getColumnKey(c) === myKey;
        })[0];
    },

    getLocalDataPaging: function(dataSource) {
        let data = this.getLocalData(dataSource);
        let current, pageSize;
        let state = this.state;
        // 如果没有分页的话，默认全部展示
        if (!this.hasPagination()) {
            pageSize = Number.MAX_VALUE;
            current = 1;
        } else {
            pageSize = state.pagination.pageSize;
            current = state.pagination.current;
        }
        // 分页
        // ---
        // 当数据量少于每页数量时，直接设置数据
        // 否则进行读取分页数据
        if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
            data = data.filter((item, i) => {
                if (i >= (current - 1) * pageSize &&
                    i < current * pageSize) {
                    return item;
                }
            });
        }
        return data;
    },


    getLocalData: function(dataSource) {
        let state = this.state;
        let data = dataSource || this.state.dataSource;
        // 排序
        if (state.sortOrder && state.sorter) {
            data = data.sort(state.sorter);
        }
        return data;
    },

    componentDidMount: function() {
        if (!this.isLocalDataSource()) {
            this.fetch();
        }
    },


    render: function() {
        let data = this.getCurrentPageData();
        let columns = this.renderRowSelection();
        let classString = this.props.className;
        let expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
        if (this.props.size === 'small') {
            classString += ' bhr-table-small';
        }
        if (this.props.bordered) {
            classString += ' bhr-table-bordered';
        }
        columns = this.renderColumnsDropdown(columns);
        columns = columns.map((column, i) => {
            column.key = column.dataIndex || i;
            return column;
        });
        let emptyText;
        let emptyClass = '';
        if (!data || data.length === 0) {
            emptyText = <div className="bhr-table-placeholder">
                <Icon type="frown"/>暂无数据
            </div>;
            emptyClass = ' bhr-table-empty';
        }

        let table = <div>
            <RCTable {...this.props}
                data={data}
                columns={columns}
                className={classString}
                expandIconAsCell={expandIconAsCell} />
            {emptyText}
        </div>;
        if (this.state.loading) {
            // if there is no pagination or no data, the height of spin should decrease by half of pagination
            let paginationPatchClass = (this.hasPagination() && data && data.length !== 0)
                  ? 'bhr-table-with-pagination'
                  : 'bhr-table-without-pagination';
            let spinClassName = `${paginationPatchClass} bhr-table-spin-holder`;
            table = <Spin className={spinClassName}>{table}</Spin>;
        }
        return (
            <div className={'clearfix' + emptyClass}>
                {table}
                {this.renderPagination()}
            </div>
        );
    }
});

Table.DataSource = DataSource;
module.exports = Table;
//export default Table;
