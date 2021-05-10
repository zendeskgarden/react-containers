# @zendeskgarden/container-modal [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-modal
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-modal

This package includes containers relating to modals in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-modal
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers?path=/story/modal-container--modalcontainer).

### useModal

```jsx static
import { useRef } from 'react';
import { useModal } from '@zendeskgarden/container-modal';

const Modal = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const modalRef = useRef(null);
  const { getBackdropProps, getModalProps, getTitleProps, getContentProps, getCloseProps } =
    useModal({ onClose: () => setModalVisibility(false), modalRef });

  return (
    <>
      <button onClick={() => setModalVisibility(!isModalVisible)}>Open Modal</button>
      {isModalVisible && (
        <div
          {...getBackdropProps({
            style: {
              background: 'rgba(0,0,0,0.2)',
              position: 'fixed',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          })}
        >
          <div
            {...getModalProps({
              ref: modalRef,
              style: {
                padding: '20px',
                background: '#fff',
                minWidth: '500px',
                minHeight: '400px',
                position: 'relative'
              }
            })}
          >
            <h1 {...getTitleProps()}>Example header</h1>
            <section {...getContentProps()}>
              <p>Modal contents</p>
              <input placeholder="focusable content" />
              <button>Submit</button>
            </section>
            <button
              {...getCloseProps({
                'aria-label': 'Schließen Sie Modal',
                style: { position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }
              })}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};
```

### ModalContainer

```jsx static
import { useRef } from 'react';
import { ModalContainer } from '@zendeskgarden/container-modal';

const Modal = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const modalRef = useRef(null);

  return (
    <>
      <button onClick={() => setModalVisibility(!isModalVisible)}>Open Modal</button>
      <ModalContainer modalRef={modalRef} onClose={() => setModalVisibility(false)}>
        {({ getBackdropProps, getModalProps, getTitleProps, getContentProps, getCloseProps }) => {
          return (
            isModalVisible && (
              <div
                {...getBackdropProps({
                  style: {
                    background: 'rgba(0,0,0,0.2)',
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }
                })}
              >
                <div
                  {...getModalProps({
                    ref: modalRef,
                    style: {
                      padding: '20px',
                      background: '#fff',
                      minWidth: '500px',
                      minHeight: '400px',
                      position: 'relative'
                    }
                  })}
                >
                  <h1 {...getTitleProps()}>Example header</h1>
                  <section {...getContentProps()}>
                    <p>Modal contents</p>
                    <input placeholder="focusable content" />
                    <button>Submit</button>
                  </section>
                  <button
                    {...getCloseProps({
                      'aria-label': 'Schließen Sie Modal',
                      style: {
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        cursor: 'pointer'
                      }
                    })}
                  >
                    X
                  </button>
                </div>
              </div>
            )
          );
        }}
      </ModalContainer>
    </>
  );
};
```
