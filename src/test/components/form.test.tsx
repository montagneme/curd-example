import { shallow, configure, render, mount } from 'enzyme';
import Form, { FormItem, FormLabel, useForm } from '../../components/form';
import Adapter from 'enzyme-adapter-react-16';
import Input from '../../components/input';

configure({ adapter: new Adapter() });

test('字段组件支持传入属性控制UI', () => {
  const component = render(<Form>
    <FormItem name='name' label='Name' required help='Name Help'><Input /></FormItem>
  </Form>);
  expect(component.find('.management-formlabel-name-require').text()).toBe('*')
  expect(component.find('.management-formlabel-name-text-label').text()).toBe('Name')
  expect(component.find('.management-formlabel-name-text-help')).toHaveLength(1)
});

test('表单支持多层嵌套', () => {
  const component = render(<Form>
    <FormItem name='name' label='Name' required><Input /></FormItem>
    <div>
      <div>
        <div>
          <FormItem name='age' label='Age' required><Input /></FormItem>
        </div>
      </div>
    </div>
  </Form>);
  expect(component.find('.management-formitem')).toHaveLength(2)
});

test('表单支持填入默认值', () => {
  const component = render(<Form initValues={{
    name: '黄仲威',
    age: '25'
  }}>
    <FormItem name='name' label='Name' required><Input /></FormItem>
    <div>
      <div>
        <div>
          <FormItem name='age' label='Age' required><Input /></FormItem>
        </div>
      </div>
    </div>
  </Form>);
  const input = component.find('.management-input-content');
  expect(input[0].attribs.value).toBe('黄仲威')
  expect(input[1].attribs.value).toBe('25')
});
