import React from "react";
import { Form, Radio, Button } from "antd";

const CulturalQuiz: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Cultural Quiz</h2>
      <Form layout="vertical">
        <Form.Item label="Which country celebrates Hanami?" name="question1">
          <Radio.Group>
            <Radio value="japan">Japan</Radio>
            <Radio value="china">China</Radio>
            <Radio value="korea">Korea</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CulturalQuiz;
