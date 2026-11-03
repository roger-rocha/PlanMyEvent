const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function form(signIn) {
  const loading = [];
  const messages = [];
  const dependencies = {
    react: {
      createElement: (type, props, ...children) => ({ type, props, children }),
      useState: initial => [initial, value => loading.push(value)],
    },
    'next/navigation': { useSearchParams: () => null },
    '@/hooks/use-toast': { toast: message => messages.push(message) },
    '@hookform/resolvers/zod': { zodResolver: () => ({}) },
    'next-auth/react': { signIn },
    'react-hook-form': { useForm: () => ({ register: () => ({}), handleSubmit: fn => fn, formState: {} }) },
    '@/lib/utils': { cn: value => value },
    '@/lib/validations/auth': { userAuthSchema: {} },
    '@/components/icons': { Icons: {} },
    '@/components/ui/label': { Label: 'label' },
    '@/components/ui/input': { Input: 'input' },
  };
  const context = { exports: {}, require: name => dependencies[name] };
  const source = ts.transpileModule(fs.readFileSync('components/user-auth-form.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(source, context);
  const tree = context.exports.UserAuthForm({});
  return { submit: tree.children.find(child => child.type === 'form').props.onSubmit, loading, messages };
}

test('a rejected authentication request displays failure and releases the form', async () => {
  const state = form(async () => { throw new SyntaxError('Non-JSON server error'); });
  await state.submit({ email: 'test@example.com' });
  assert.deepEqual(state.loading, [true, false]);
  assert.equal(state.messages.length, 1);
  assert.equal(state.messages[0].variant, 'destructive');
});

test('an authentication error never claims an email was sent', async () => {
  const state = form(async () => ({ ok: true, error: 'EmailSignin' }));
  await state.submit({ email: 'test@example.com' });
  assert.deepEqual(state.loading, [true, false]);
  assert.equal(state.messages[0].variant, 'destructive');
});

test('a successful request shows confirmation and releases the form', async () => {
  const state = form(async () => ({ ok: true, error: null }));
  await state.submit({ email: 'test@example.com' });
  assert.deepEqual(state.loading, [true, false]);
  assert.equal(state.messages[0].title, 'Verifique seu email');
});
