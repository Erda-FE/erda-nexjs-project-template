/* eslint-disable no-param-reassign */
import React from 'react';
import { Form } from 'antd';
import { FormInstance, FormProps } from 'antd/lib/form/Form';
import ResizeObserver from 'rc-resize-observer';
import { useUpdate } from 'src/common/utils';
import { throttle } from 'lodash';
import { IFieldType } from './fields';

/**
 * FormBuilder is a Form container.
 *
 * isMultiColumn: whether to use multiple column or not
 * columnNum: amount of column, only become effective when isMultiColumn is true
 * readonly: whether all the Form.Item in Form is readonly, default false.
 * else: the same as antd Form
 *
 * */
export interface IContextType {
  realColumnNum?: number;
  parColumnNum?: number;
  parIsMultiColumn?: boolean;
  parReadonly?: boolean;
  setFieldsInfo: (k: string, v: IFieldType[]) => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IFormExtendType<T = any> extends FormInstance {
  validateFieldsAndScroll: (scb: (values: T) => void, fcb?: (err?: Obj<ErrorEvent>) => void) => void;
  fieldsInfo: { [key: string]: IFieldType[] };
}

export const FormContext = React.createContext<IContextType | null>(null);

interface IPureProps<T> extends IProps {
  form: FormInstance & IFormExtendType<T>;
}

interface IProps extends FormProps {
  children: React.ReactNode;
  isMultiColumn?: boolean;
  columnNum?: number;
  readonly?: boolean;
  layout?: 'horizontal' | 'vertical' | 'inline';
}

const PureFormBuilder = <T extends Obj>({
  form,
  children,
  layout = 'vertical',
  isMultiColumn,
  columnNum,
  readonly,
  ...rest
}: IPureProps<T>) => {
  const [{ realColumnNum }, updater] = useUpdate({
    realColumnNum: undefined as undefined | number,
  });

  form.validateFieldsAndScroll = (successCallBack, errorCallBack) => {
    form
      .validateFields()
      .then(successCallBack)
      .catch((err) => {
        errorCallBack?.(err);
        form.scrollToField(err.errorFields?.[0]?.name);
      });
  };

  form.fieldsInfo = {};

  const setFieldsInfo = (key: string, value: IFieldType[]) => {
    form.fieldsInfo[key] = value;
  };

  const handleResize = throttle(({ width }: { width: number }) => {
    let columns = 1;
    if (width <= 400) {
      columns = 1;
    } else if (width < 600) {
      columns = 2;
    } else if (width < 1024) {
      columns = 3;
    } else if (width < 1440) {
      columns = 4;
    } else if (width < 1920) {
      columns = 6;
    } else {
      columns = 8;
    }
    updater.realColumnNum(columns);
  }, 500);

  return (
    <ResizeObserver onResize={handleResize}>
      <div>
        <Form {...rest} form={form} layout={layout}>
          <FormContext.Provider
            value={{
              realColumnNum,
              parIsMultiColumn: isMultiColumn,
              parColumnNum: columnNum,
              parReadonly: readonly,
              setFieldsInfo,
            }}
          >
            {children}
          </FormContext.Provider>
        </Form>
      </div>
    </ResizeObserver>
  );
};

const FormBuilder = React.forwardRef(
  <T extends Obj>({ children, ...rest }: IProps, ref: React.Ref<IFormExtendType<T>>) => {
    const [form] = Form.useForm() as [IFormExtendType<T>];

    React.useImperativeHandle(ref, () => form);

    return (
      <PureFormBuilder {...rest} form={form}>
        {children}
      </PureFormBuilder>
    );
  },
);

export { PureFormBuilder, FormBuilder };
