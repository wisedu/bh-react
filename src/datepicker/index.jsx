import React from 'react';
import Calendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import Datepicker from 'rc-calendar/lib/Picker';
import GregorianCalendar from 'gregorian-calendar';
import defaultLocale from './locale';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import DateTimeFormat from 'gregorian-calendar-format';
import objectAssign from 'object-assign';

function createPicker(TheCalendar) {
  return React.createClass({
    getDefaultProps() {
      return {
        format: 'yyyy-MM-dd',
        placeholder: '请选择日期',
        transitionName: 'slide-up',
        popupStyle: {},
        onSelect: null, // 向前兼容
        onChange() {
        },  // onChange 可用于 Validator
        locale: {},
        align: {
          offset: [0, -10],
        }
      };
    },
    getInitialState() {
      return {
        value: this.parseDateFromValue(this.props.value || this.props.defaultValue)
      };
    },
    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: this.parseDateFromValue(nextProps.value)
        });
      }
    },
    getLocale() {
      // 统一合并为完整的 Locale
      let locale = objectAssign({}, defaultLocale, this.props.locale);
      locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
      return locale;
    },
    getFormatter() {
      const formats = this.formats = this.formats || {};
      const format = this.props.format;
      if (formats[format]) {
        return formats[format];
      }
      formats[format] = new DateTimeFormat(format, this.getLocale().lang.format);
      return formats[format];
    },
    parseDateFromValue(value) {
      if (value) {
        if (typeof value === 'string') {
          return this.getFormatter().parse(value, {locale: this.getLocale()});
        } else if (value instanceof Date) {
          let date = new GregorianCalendar(this.getLocale());
          date.setTime(value);
          return date;
        }
      } else if (value === null) {
        return value;
      }
      return undefined;
    },
    // remove input readonly warning
    handleInputChange() {
    },
    handleChange(value) {
      this.setState({value});
      const timeValue = value ? new Date(value.getTime()) : null;
      // onSelect 为向前兼容.
      if (this.props.onSelect) {
        require('util-deprecate')(this.props.onSelect, 'onSelect property of Datepicker is deprecated, use onChange instead')(timeValue);
      }
      this.props.onChange(timeValue);
    },
    render() {
      // 以下两行代码
      // 给没有初始值的日期选择框提供本地化信息
      // 否则会以周日开始排
      let defaultCalendarValue = new GregorianCalendar(this.getLocale());
      defaultCalendarValue.setTime(Date.now());
      const calendar = (
        <TheCalendar
          disabledDate={this.props.disabledDate}
          locale={this.getLocale().lang}
          defaultValue={defaultCalendarValue}
          dateInputPlaceholder={this.props.placeholder}
          showTime={this.props.showTime}
          prefixCls="ant-calendar"
          showOk={this.props.showTime}
          showClear={true}/>
      );
      let sizeClass = '';
      if (this.props.size === 'large') {
        sizeClass = ' ant-input-lg';
      } else if (this.props.size === 'small') {
        sizeClass = ' ant-input-sm';
      }

      return <span className="ant-calendar-picker">
        <Datepicker
          transitionName={this.props.transitionName}
          disabled={this.props.disabled}
          calendar={calendar}
          value={this.state.value}
          prefixCls="ant-calendar-picker-container"
          style={this.props.popupStyle}
          align={this.props.align}
          onChange={this.handleChange}>
          {
            ({value}) => {
              return <span>
                  <input disabled={this.props.disabled}
                         onChange={this.handleInputChange}
                         value={value && this.getFormatter().format(value)}
                         placeholder={this.props.placeholder}
                         className={'ant-calendar-picker-input ant-input' + sizeClass}/>
                  <span className="ant-calendar-picker-icon"/>
                </span>;
            }
          }
        </Datepicker>
      </span>;
    }
  });
}

const AntDatePicker = createPicker(Calendar);
const AntMonthPicker = createPicker(MonthCalendar);

const AntCalendar = React.createClass({
  getDefaultProps() {
    return {
      locale: CalendarLocale,
      prefixCls: 'ant-calendar',
    };
  },
  render() {
    return <Calendar {...this.props} />;
  }
});

AntDatePicker.Calendar = AntCalendar;
AntDatePicker.MonthPicker = AntMonthPicker;

export default AntDatePicker;
