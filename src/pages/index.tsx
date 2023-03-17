import { readNFCTag, writeNFCTag } from "@/lib";
import { Alert, Button, Divider, message, Space } from "antd";
import { FC, useEffect, useId, useState } from "react";

function randint() {
  return Math.floor(1000000 * Math.random());
}

const Homepage: FC = () => {
  const id = useId();
  const [msg, setMsg] = useState<string[]>([]);
  const [notSupported, setNotSupported] = useState(false);

  useEffect(() => {
    if (!("NDEFReader" in window)) {
      setNotSupported(true);
    }
  }, []);

  return (
    <section>
      <div>version 0.0.10</div>
      {notSupported ? (
        <Alert
          type="info"
          showIcon
          closable
          message="Web NFC is not supported on this device."
          description="At this moment, Web NFC is only available on Chrome-based Android browsers through the HTTPS protocole."
        />
      ) : (
        <Space>
          <Button
            type="primary"
            onClick={async () => {
              const data = await readNFCTag();
              setMsg((prev) => [...prev, JSON.stringify(data, null, 2)]);
            }}
          >
            Allow NFC Reading
          </Button>
          <Button
            type="primary"
            onClick={async () => {
              await writeNFCTag(`${randint()}`);
              message.success("Success");
            }}
          >
            Write a random number
          </Button>
        </Space>
      )}

      <Divider />
      <article>
        {msg.map((e, i) => (
          <pre key={`${id}-${e}-${i}`}>{e}</pre>
        ))}
      </article>
    </section>
  );
};

export default Homepage;
