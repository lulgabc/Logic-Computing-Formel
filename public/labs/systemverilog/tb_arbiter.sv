`timescale 1ns/1ps

module tb_arbiter;
  logic       clk;
  logic       rst_n = 1'b0;
  logic [1:0] req = 2'b00;
  logic [1:0] gnt;

  arbiter dut (
    .clk(clk),
    .rst_n(rst_n),
    .req(req),
    .gnt(gnt)
  );

  initial begin
    clk = 1'b0;
    forever #5 clk = ~clk;
  end

  task automatic check_onehot;
    if (gnt == 2'b11) $fatal(1, "mutual exclusion violated: gnt=%b", gnt);
  endtask

  initial begin
    repeat (2) @(posedge clk);
    @(negedge clk);
    rst_n = 1'b1;

    req = 2'b01;
    @(posedge clk); #1; check_onehot();
    if (gnt !== 2'b01) $fatal(1, "expected grant 01, got %b", gnt);

    req = 2'b10;
    @(posedge clk); #1; check_onehot();
    if (gnt !== 2'b10) $fatal(1, "expected grant 10, got %b", gnt);

    req = 2'b11;
    @(posedge clk); #1; check_onehot();
    if (gnt !== 2'b01) $fatal(1, "priority should grant 01, got %b", gnt);

    req = 2'b00;
    @(posedge clk); #1; check_onehot();
    if (gnt !== 2'b00) $fatal(1, "expected idle, got %b", gnt);

    $display("PASS: arbiter grants at most one request");
    $finish;
  end
endmodule
